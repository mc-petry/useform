import { useCallback, useMemo, useState, useRef, createRef } from 'react'
import { Mutable } from './utils'
import { FieldDef } from './field-def'
import { Field } from './field'
import { FormOptions } from './form-options'
import { FormTransformers } from './form-transformers'

export { Field, FieldDef, FormOptions, FormTransformers }

export type Fields<T extends { [key: string]: any }> = { [P in keyof T]: Mutable<Field<T[P], Extract<P, string>>> }
export type FieldDefs<T, TValidationResult> = { [P in keyof T]: FieldDef<T[P], T, TValidationResult> }
type FieldName<T> = Extract<keyof T, string>
type FieldsList<T> = FieldName<T>[] | FieldName<T>

const INITIAL_FORM_OPTIONS: FormOptions<any, any> = {
  validateOnBlur: true,
  validateOnChange: false
}

const INITIAL_FIELD_STATE: Pick<Field, 'dirty' | 'touched' | 'error' | 'warn' | 'value'> = {
  dirty: false,
  touched: false,
  error: null,
  warn: null,
  value: undefined,
}

export function useForm<
  T extends { [key: string]: any },
  TValidationResult = any
>(
  fieldDefs: Partial<FieldDefs<T, TValidationResult>> = {},
  options?: FormOptions<T, TValidationResult>
) {
  const [, setState] = useState(true)
  const forceUpdate = useCallback(() => setState(s => !s), [])

  const res = useMemo(() => {
    const _defs = fieldDefs as FieldDefs<T, TValidationResult>
    const _opts: FormOptions<any, any> = {
      ...INITIAL_FORM_OPTIONS,
      ...options
    }

    const _fields = {} as Fields<T>

    const fieldNames = () => Object.keys(_fields) as FieldName<T>[]

    const transformError = (field: Field, error: any) => {
      const transformers = _opts.transformers

      return error
        ? transformers && transformers.error
          ? transformers.error(error, field)
          : error
        : null
    }

    const validateField = (name: keyof T) => {
      const field = _fields[name]
      const def = _defs[name]
      const validateFn = def.validate
      const warnFn = def.warn

      if (validateFn) {
        field.error = transformError(field, validateFn(field.value))
      }

      if (warnFn) {
        field.warn = transformError(field, warnFn(field.value))
      }

      // Validate dependent fields
      let dependent = def.dependent

      if (dependent) {
        if (typeof dependent === 'string') {
          dependent = [dependent]
        }

        for (const dep of dependent) {
          if (_fields[dep].touched) {
            validateField(dep)
          }
        }
      }
    }

    const handleChange = (name: keyof T, value: any) => {
      const field = _fields[name]

      field.value = value
      field.dirty = true

      const def = _defs[name]

      // Validate
      const validateOnChange = def.validateOnChange != null
        ? def.validateOnChange
        : _opts.validateOnChange

      if (validateOnChange) {
        validateField(name)
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

    const proxy = new Proxy(_fields, {
      get(target, name: Extract<keyof T, string>) {
        if (!target[name]) {
          target[name] = {
            ref: createRef(),
            name,
            label: undefined,

            ...INITIAL_FIELD_STATE,

            onChange: value => handleChange(name, value),
            onFocus: () => handleFocus(name),
            onBlur: () => handleBlur(name)
          }

          if (!_defs[name]) {
            _defs[name] = {}
          }
        }

        return target[name]
      }
    })

    /**
     * Gets a value that indicates whether the form has error
     */
    const hasError = (fields: FieldsList<T> = fieldNames()) => {
      if (typeof fields === 'string') {
        fields = [fields]
      }

      for (const name of fields) {
        if (_fields[name].error) {
          return true
        }
      }

      return false
    }

    /**
     * Gets a value that indicates whether the form has error
     */
    const hasWarn = (fields: FieldsList<T> = fieldNames()) => {
      if (typeof fields === 'string') {
        fields = [fields]
      }

      for (const name of fields) {
        if (_fields[name].warn) {
          return true
        }
      }

      return false
    }

    const focusInvalidField = () => {
      for (const name of fieldNames()) {
        const field = _fields[name]

        if (field.error) {
          if (field.ref.current) {
            field.ref.current.focus()
          }

          return
        }
      }
    }

    /**
     * Validates specific field(s)
     * @returns `true` when form validates successfully
     */
    const validate = async (fields: FieldsList<T> = fieldNames()) => {
      if (typeof fields === 'string') {
        fields = [fields]
      }

      for (const field of fields) {
        validateField(field)
      }

      const err = hasError(fields)

      if (err) {
        focusInvalidField()
      }

      forceUpdate()

      return !err
    }

    /**
     * Gets a value that indicates whether the form was touched
     */
    const touched = () => {
      for (const name of fieldNames()) {
        if (_fields[name].touched) {
          return true
        }
      }

      return false
    }

    /**
     * Gets form values
     */
    const getValues = () => {
      const data: Partial<T> = {}

      fieldNames().forEach(name => {
        data[name] = _fields[name].value
      })

      return data as T
    }

    /**
     * Sets form values
     */
    const setValues = (values: Partial<T>) => {
      for (const name of Object.keys(values)) {
        _fields[name].value = values
      }

      forceUpdate()
    }

    /**
     * Handles form submit. Typically should be passed into `<form>`
     */
    const handleSubmit = (e: React.SyntheticEvent) => {
      e.preventDefault()

      validate()
        .then(success => {
          if (success && _opts.submit) {
            _opts.submit(getValues())
          }
        })
    }

    const reset = (fields: FieldsList<T> = fieldNames()) => {
      for (const name of Object.keys(_fields)) {
        _fields[name] = {
          ..._fields[name],
          ...INITIAL_FIELD_STATE
        }
      }

      forceUpdate()
    }

    return {
      fields: proxy,
      validate,
      handleSubmit,
      hasError,
      hasWarn,
      touched,
      getValues,
      setValues,
      reset
    }
  }, [])

  return res
}
