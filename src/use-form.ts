import { createRef, useMemo, useReducer } from 'react'
import { Field, FieldDefinitions, Fields, Form, FormOptions } from '.'
import { FieldErrors, FieldName, FieldNames, ValidationResultDefault, ValidationRules } from './models/field-definition'
import { Mutable } from './models/mutable'

const INITIAL_FORM_OPTIONS: Omit<FormOptions<any, any>, 'fields'> = {
  validateOnBlur: true,
  validateOnChange: false,
}

const INITIAL_FIELD_STATE: Pick<Field, 'dirty' | 'touched' | 'error' | 'warn' | 'value'> = {
  dirty: false,
  touched: false,
  error: null,
  warn: null,
  value: undefined,
}

function asArray<T>(singleOrArray: T | T[]) {
  return Array.isArray(singleOrArray) ? singleOrArray : [singleOrArray]
}

async function callValidate<T>(validation: ValidationRules<any, T, any>, value: any, fields: Fields<T>) {
  const fns = asArray(validation)

  for (const fn of fns) {
    const result = await fn(value)

    if (result) {
      return result
    }
  }
}

/**
 * Creates form with specific fields.
 * @param deps Useful for recreating form.
 * @example
 * interface User {
 *   name: string
 *   age: number
 * }
 *
 * const { fields, handleSubmit } = useForm<User>()
 */
export function useForm<T extends Record<string, any>, TValidationResult = ValidationResultDefault>(
  options: FormOptions<T, TValidationResult> = {},
  deps: any[] = []
) {
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  const res = useMemo(() => {
    const _defs = (options.fields || {}) as FieldDefinitions<T, TValidationResult>
    const _opts: Omit<FormOptions<T, any>, 'fields'> = {
      ...INITIAL_FORM_OPTIONS,
      ...options,
    }

    const _fields = {} as Fields<T>
    const fieldNames = () => Object.keys(_fields) as FieldName<T>[]

    const transformError = (field: Field, error: any) => {
      const transformers = _opts.transformers
      return (error && transformers?.error?.(error, field)) || error || null
    }

    const validateField = async (name: keyof T) => {
      const field = _fields[name] as Mutable<Field>
      const def = _defs[name]

      if (field.forms) {
        for (const form of field.forms) {
          await form.validate()
        }
      } else {
        const validateFn =
          def.validate || (_opts.validationSchema && (_opts.validationSchema[name] as ValidationRules<any, any, any>))
        const warnFn = def.warn

        field.error = validateFn ? transformError(field, await callValidate(validateFn, field.value, _fields)) : null
        field.warn = warnFn ? transformError(field, await callValidate(warnFn, field.value, _fields)) : null

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
      const field = _fields[name] as Mutable<Field>

      field.value = value
      field.dirty = true

      const def = _defs[name]

      // Validate
      const validateOnChange = def.validateOnChange != null ? def.validateOnChange : _opts.validateOnChange

      if (validateOnChange) {
        await validateField(name)
      }
    }

    const handleFocus = (name: keyof T) => {
      const field = _fields[name] as Mutable<Field>

      if (field.touched) {
        return
      }

      field.touched = true
      forceUpdate()
    }

    const handleBlur = async (name: keyof T) => {
      if (!_fields[name].dirty) {
        return
      }

      const def = _defs[name]

      const validateOnBlur = def.validateOnBlur != null ? def.validateOnBlur : _opts.validateOnBlur!

      if (validateOnBlur) {
        await validateField(name)
      }

      forceUpdate()
    }

    const fields: Fields<T> = new Proxy(_fields, {
      get(target, name: Extract<keyof T, string>) {
        if (!target[name]) {
          target[name] = {
            ref: createRef(),
            name,
            label: _opts.transformers?.label?.(name) || undefined,

            ...INITIAL_FIELD_STATE,

            onChange: value => handleChange(name, value),
            onFocus: () => handleFocus(name),
            onBlur: () => handleBlur(name),

            addForm: function (form) {
              if (!this.forms) {
                this.forms = []
              }

              this.forms.push(form as Form)
            },
            removeForm: function (form) {
              if (!this.forms) {
                this.forms = []
              }

              this.forms.splice(this.forms.indexOf(form), 1)
            },
          }

          if (!_defs[name]) {
            _defs[name] = _opts.fieldConfig?.(name) || {}
          }
        }

        return target[name]
      },
    })

    if (_opts.initialValues) {
      for (const [name, value] of Object.entries(_opts.initialValues)) {
        const field = fields[name] as Mutable<Field>
        field.value = value
      }
    }

    const hasErrorInternal = (type: 'error' | 'warn', fieldsList: FieldNames<T>) => {
      fieldsList = asArray(fieldsList)

      for (const name of fieldsList) {
        const field = _fields[name]

        if (field.forms) {
          for (const childForm of field.forms) {
            const fn = type === 'error' ? childForm.hasError : childForm.hasWarn
            if (fn()) {
              return true
            }
          }
        } else {
          if (field[type]) {
            return true
          }
        }
      }

      return false
    }

    const hasError = (fields: FieldNames<T> = fieldNames()) => hasErrorInternal('error', fields)
    const hasWarn = (fields: FieldNames<T> = fieldNames()) => hasErrorInternal('warn', fields)

    const focusInvalidField = () => {
      for (const name of fieldNames()) {
        const field = _fields[name]

        if (field.forms) {
          for (const f of field.forms) {
            if (f.hasError()) {
              f.focusInvalidField()
              return
            }
          }
        } else {
          if (field.error) {
            field.ref.current?.focus()
            return
          }
        }
      }
    }

    const validate = async (fields: FieldNames<T> = fieldNames(), silent = false) => {
      fields = asArray(fields)

      for (const field of fields) {
        await validateField(field)
      }

      const err = hasError(fields)

      if (!silent) {
        if (err) {
          focusInvalidField()
        }
        forceUpdate()
      }

      return !err
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

      for (const name of fieldNames()) {
        data[name] = _fields[name].value
      }

      return data as T
    }

    const setValues = (values: Partial<T>, shouldValidate?: boolean) => {
      for (const [name, value] of Object.entries(values)) {
        const field = fields[name] as Mutable<Field>
        field.value = value
      }

      if (shouldValidate) {
        validate()
      } else {
        forceUpdate()
      }
    }

    const handleSubmit = (onSubmit: (values: T) => void) => async (e: React.SyntheticEvent) => {
      e.preventDefault()

      if (await validate()) {
        onSubmit(getValues())
      }
    }

    const reset = (fields: FieldNames<T> = fieldNames()) => {
      for (const name of fields) {
        const field = _fields[name as FieldName<T>]

        _fields[name as FieldName<T>] = {
          ...field,
          ...INITIAL_FIELD_STATE,
        }

        // TODO too many children force updates
        field.forms?.forEach(form => form.reset())
      }

      forceUpdate()
    }

    function setErrorsInternal(key: 'error' | 'warn', errors: FieldErrors<T>) {
      for (const name of Object.keys(errors)) {
        const field = fields[name] as Mutable<Field>
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

    const form: Form<T> = {
      fields,
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
      focusInvalidField,
    }

    return form
  }, deps)

  return res
}
