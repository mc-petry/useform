import { useCallback, useMemo, useState, createRef, RefObject, MutableRefObject, useEffect, useRef } from 'react'
import { FieldDef, FieldDefs, ValidateFn, ValidationSchema } from './field-defs'
import { Field, Fields, MutableFields } from './fields'
import { FormOptions } from './form-options'
import { FormTransformers } from './form-transformers'
import { FieldName, FieldsList, Form, FieldErrors, ValidationResult, InternalForm } from './form'
import { useChildForm, PrimitiveFormFields, removeFieldItem, addFieldItem } from './child'
import { memoField } from './memo-field'

export {
  Field,
  Fields,
  FieldDef,
  FieldDefs,
  Form,
  FormOptions,
  FormTransformers,
  useChildForm,
  PrimitiveFormFields,
  removeFieldItem,
  addFieldItem,
  memoField
}

const INITIAL_FORM_OPTIONS: Omit<FormOptions<any, any>, 'fields'> = {
  validateOnBlur: true,
  validateOnChange: false
}

const INITIAL_FIELD_STATE: Pick<Field, 'dirty' | 'touched' | 'error' | 'warn' | 'value'> = {
  dirty: false,
  touched: false,
  error: null,
  warn: null,
  value: undefined
}

export type FormOptionsInitializer<T, TValidationResult> = FormOptions<T, TValidationResult> | (() => FormOptions<T, TValidationResult>)

async function callValidate<T>(fn: ValidateFn<any, T, any>, value: any, fields: Fields<T>) {
  if (Array.isArray(fn)) {
    for (const f of fn) {
      const result = await f(value, fields)

      if (result) {
        return result
      }
    }
  }
  else {
    return fn(value, fields)
  }
}

export function useForm<
  T extends { [key: string]: any },
  TValidationResult = ValidationResult
>(getInitialOptions?: FormOptionsInitializer<T, TValidationResult>, deps: any[] = []) {
  const [, setState] = useState(0)
  const silent = useRef(false)
  const forceUpdate = useCallback(() => {
    if (!silent.current) {
      setState(s => s + 1)
    }
  }, [])

  const res = useMemo(() => {
    const options = getInitialOptions
      ? typeof getInitialOptions === 'function'
        ? getInitialOptions()
        : getInitialOptions
      : {}
    const _defs = (options.fields || {}) as FieldDefs<T, TValidationResult>
    const _opts: Omit<FormOptions<T, any>, 'fields'> = {
      ...INITIAL_FORM_OPTIONS,
      ...options as any
    }

    const _fields = {} as MutableFields<T>

    const fieldNames = () => Object.keys(_fields) as FieldName<T>[]

    const transformError = (field: Field, error: any) => {
      const transformers = _opts.transformers

      return error
        ? transformers && transformers.error
          ? transformers.error(error, field)
          : error
        : null
    }

    const validateField = async (name: keyof T) => {
      const field = _fields[name]
      const def = _defs[name]

      if (field.forms.length > 0) {
        field.forms.forEach(f => {
          (f as InternalForm).subformValidate()
        })
      }
      else {
        const validateFn = def.validate || _opts.validationSchema && _opts.validationSchema[name] as ValidateFn<any, any, any>
        const warnFn = def.warn

        field.error = validateFn
          ? transformError(field, await callValidate(validateFn, field.value, _fields))
          : null

        field.warn = warnFn
          ? transformError(field, await callValidate(warnFn, field.value, _fields))
          : null

        // Validate dependent fields
        let dependent = def.dependent

        if (dependent) {
          if (typeof dependent === 'string') {
            dependent = [dependent]
          }

          for (const dep of dependent) {
            if (_fields[dep].touched) {
              await validateField(dep)
            }
          }
        }
      }
    }

    const handleChange = async (name: keyof T, value: any) => {
      const field = _fields[name]

      field.value = value
      field.dirty = true

      const def = _defs[name]

      // Validate
      const validateOnChange = def.validateOnChange != null
        ? def.validateOnChange
        : _opts.validateOnChange

      if (validateOnChange) {
        await validateField(name)
      }

      // Handle changed event
      if (def.changed) {
        def.changed(value)
      }

      forceUpdate()
    }

    const handleFocus = (name: keyof T) => {
      const field = _fields[name]

      field.touched = true

      forceUpdate()
    }

    const handleBlur = (name: keyof T) => {
      if (!_fields[name].dirty) {
        return
      }

      const def = _defs[name]

      const validateOnBlur = def.validateOnBlur != null
        ? def.validateOnBlur
        : _opts.validateOnBlur!

      if (validateOnBlur) {
        validateField(name)
      }

      forceUpdate()
    }

    const proxy: Fields<T> = new Proxy(_fields, {
      get(target, name: Extract<keyof T, string>) {
        if (!target[name]) {
          target[name] = {
            ref: createRef(),
            name,
            label: _opts.transformers && _opts.transformers.label
              ? _opts.transformers.label(name)
              : undefined,

            ...INITIAL_FIELD_STATE,

            onChange: value => handleChange(name, value),
            onFocus: () => handleFocus(name),
            onBlur: () => handleBlur(name),

            forms: [],

            addChildForm: f => {
              _fields[name].forms.push(f)
            },
            removeChildForm: f => {
              _fields[name].forms.splice(_fields[name].forms.indexOf(f), 1)
            }
          }

          if (!_defs[name]) {
            _defs[name] = _opts.fieldConfig && _opts.fieldConfig(name) || {}
          }
        }

        return target[name]
      }
    })

    // Initialize fields defined in validation schema
    if (options.validationSchema) {
      Object.keys(options.validationSchema).forEach(name => {
        // tslint:disable-next-line: no-unused-expression
        proxy[name]
      })
    }

    // Initialize fields defined in initialValues
    if (options.initialValues) {
      Object.keys(options.initialValues).forEach(name => {
        (proxy as MutableFields<T>)[name].value = options.initialValues![name]
      })
    }

    const hasErrorInternal = (type: 'hasError' | 'hasWarn', fields: FieldsList<T> = fieldNames()) => {
      if (typeof fields === 'string') {
        fields = [fields]
      }

      for (const name of fields) {
        if (_fields[name].forms.length > 0) {
          for (const f of _fields[name].forms) {
            if (f[type]()) {
              return true
            }
          }
        }
        else {
          if (_fields[name].error) {
            return true
          }
        }
      }

      return false
    }

    const hasError = (fields: FieldsList<T> = fieldNames()) => hasErrorInternal('hasError', fields)
    const hasWarn = (fields: FieldsList<T> = fieldNames()) => hasErrorInternal('hasWarn', fields)

    const focusInvalidField = () => {
      for (const name of fieldNames()) {
        const field = _fields[name]

        if (field.forms.length > 0) {
          for (const f of field.forms) {
            if (f.hasError()) {
              f.focusInvalidField()

              return
            }
          }
        }
        else {
          if (field.error) {
            if (field.ref.current) {
              field.ref.current.focus()
            }

            return
          }
        }
      }
    }

    const validate = async (fields: FieldsList<T> = fieldNames()) => {
      if (typeof fields === 'string') {
        fields = [fields]
      }

      for (const field of fields) {
        await validateField(field)
      }

      const err = hasError(fields)

      if (err) {
        focusInvalidField()
      }

      forceUpdate()

      return !err
    }

    const subformValidate = async () => {
      for (const field of fieldNames()) {
        await validateField(field)
      }

      forceUpdate()
    }

    const touched = () => {
      for (const name of fieldNames()) {
        if (_fields[name].touched) {
          return true
        }
      }

      return false
    }

    const dirty = () => {
      for (const name of fieldNames()) {
        if (_fields[name].dirty) {
          return true
        }
      }

      return false
    }

    const getValues = () => {
      const data: Partial<T> = {}

      fieldNames().forEach(name => {
        data[name] = _fields[name].value
      })

      return data as T
    }

    const setValues = (values: Partial<T>, shouldValidate?: boolean) => {
      for (const name of Object.keys(values)) {
        (proxy as MutableFields<T>)[name].value = values[name]
      }

      if (shouldValidate) {
        validate()
      }
      else {
        forceUpdate()
      }
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()

      const success = await validate()

      if (success && _opts.submit) {
        _opts.submit(getValues())
      }
    }

    const reset = (fields: FieldsList<T> = fieldNames()) => {
      for (const name of fields) {
        const field = _fields[name as FieldName<T>]

        _fields[name as FieldName<T>] = {
          ...field,
          ...INITIAL_FIELD_STATE
        }

        if (field.forms.length > 0) {
          field.forms.forEach(f => f.reset())
        }
      }

      forceUpdate()
    }

    const addField = (fields: FieldDefs<T, TValidationResult>) => {
      for (const name of Object.keys(fields)) {
        _defs[name as FieldName<T>] = fields[name]
      }

      forceUpdate()
    }

    const removeField = (fields: FieldsList<T>) => {
      if (typeof fields === 'string') {
        fields = [fields]
      }

      fields.forEach(name => {
        delete _fields[name]
      })

      forceUpdate()
    }

    function setErrorsInternal(key: 'error' | 'warn', errors: FieldErrors<T>) {
      for (const name of Object.keys(errors)) {
        const field = (proxy as MutableFields<T>)[name]
        field[key] = transformError(field, errors[name])
      }

      forceUpdate()
    }

    const setErrors = (errors: FieldErrors<T>) => {
      setErrorsInternal('error', errors)
    }

    const setWarns = (errors: FieldErrors<T>) => {
      setErrorsInternal('warn', errors)
    }

    const setSilent = (value: boolean) => {
      silent.current = value
    }

    const form = {
      fields: proxy as Fields<T>,
      validate,
      handleSubmit,
      hasError,
      hasWarn,
      touched,
      dirty,
      getValues,
      setValues,
      setErrors,
      setWarns,
      reset,
      removeField,
      addField,
      focusInvalidField,
      setSilent,
      subformValidate
    } as InternalForm<T>

    return form as Form<T>
  }, deps)

  return res
}
