import { createRef, useMemo, useReducer } from 'react'
import { Field, FieldConfigurations, Fields, Form, FormOptions, ValidationRules } from '.'
import { Mutable } from './helpers/mutable'
import { FieldConfigurationDynamic } from './models/field-configuration'
import { FieldName, FieldNames } from './models/field-name'
import { FieldErrors, ValidationResultDefault } from './models/validation'

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
    const result = await fn(value, fields)

    if (result) {
      return result
    }
  }
}

/**
 * Creates form with specific fields.
 *
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
    const _defs = (options.fields || {}) as FieldConfigurations<T, TValidationResult>
    const _opts: Omit<FormOptions<T, any>, 'fields'> = {
      validateOnBlur: true,
      validateOnChange: false,
      ...options,
    }

    const _fields = {} as Fields<T>
    const fieldNames = () => Object.keys(fields) as FieldName<T>[]

    const transformError = (field: Field, error: any) => {
      return (error && _opts.transformers?.error?.(error, field)) || error || null
    }

    const validateField = async (name: keyof T) => {
      const field = _fields[name] as Mutable<Field>
      const def = _defs[name]

      if (field.forms) {
        for (const form of field.forms) {
          await form.validate(undefined, true)
        }
      } else {
        const validateFn =
          (def as FieldConfigurationDynamic<any, T, TValidationResult>).validate || _opts.schema?.[name]
        const warnFn = def.warn

        field.error = validateFn ? transformError(field, await callValidate(validateFn, field.value, _fields)) : null
        field.warn = warnFn ? transformError(field, await callValidate(warnFn, field.value, _fields)) : null

        // Validate dependent fields
        if (def.dependent) {
          for (const dep of asArray(def.dependent)) {
            if (_fields[dep].touched) {
              await validateField(dep)
            }
          }
        }
      }
    }

    const handleFieldChange = async (name: FieldName<T>, value: any) => {
      const field = _fields[name] as Mutable<Field>

      field.value = value
      field.dirty = true

      const def = _defs[name]
      const validateOnChange = def.validateOnChange != null ? def.validateOnChange : _opts.validateOnChange

      if (validateOnChange) {
        await validateField(name)
      }

      const watch = _opts.watch

      if (watch && (typeof watch === 'boolean' || asArray(watch).includes(name))) {
        forceUpdate()
      }
    }

    const handleFieldFocus = (name: keyof T) => {
      const field = _fields[name] as Mutable<Field>

      if (field.touched) {
        return
      }

      field.touched = true
      forceUpdate()
    }

    const handleFieldBlur = async (name: keyof T) => {
      const field = _fields[name]

      if (field.forms) {
        forceUpdate()
        return
      }

      if (!field.dirty) {
        return
      }

      const def = _defs[name]
      const validateOnBlur = def.validateOnBlur != null ? def.validateOnBlur : _opts.validateOnBlur

      if (validateOnBlur) {
        await validateField(name)
      }

      forceUpdate()
    }

    const getFieldInitialValue = (name: FieldName<T>) => {
      return _opts.initial?.[name] || INITIAL_FIELD_STATE.value
    }

    const fields: Fields<T> = new Proxy(_fields, {
      get(target, name: FieldName<T>) {
        if (!target[name]) {
          if (!_defs[name]) {
            _defs[name] = _opts.dynamic?.(name) || {}
          }

          target[name] = {
            ...INITIAL_FIELD_STATE,
            ref: createRef(),
            name,
            value: getFieldInitialValue(name),

            onChange: value => handleFieldChange(name, value),
            onFocus: () => handleFieldFocus(name),
            onBlur: () => handleFieldBlur(name),

            addForm: function (form) {
              if (!this.forms) {
                this.forms = []
              }

              this.forms.push(form)
            },
            removeForm: function (form) {
              if (!this.forms) {
                return
              }

              this.forms.splice(this.forms.indexOf(form), 1)

              if (this.forms.length === 0) {
                this.forms = undefined
              }
            },
          }
        }

        return target[name]
      },
    })

    const initFields = (obj: {} | undefined | null) => {
      if (obj) {
        for (const name of Object.keys(obj)) {
          fields[name]
        }
      }
    }

    initFields(_opts.schema)
    initFields(_opts.initial)

    const handleSubmit = (onSubmit: (values: T) => void) => async (e?: React.SyntheticEvent) => {
      if (e && e.preventDefault) {
        e.preventDefault()
      }

      if (await validate()) {
        onSubmit(getValues())
      }
    }

    const hasErrorInternal = (type: 'error' | 'warn', fieldNames: FieldNames<T>) => {
      fieldNames = asArray(fieldNames)

      for (const name of fieldNames) {
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

    const reset = (fields: FieldNames<T> = fieldNames()) => {
      for (const name of asArray(fields)) {
        const field = _fields[name] as Mutable<Field>
        delete _fields[name]

        // for (const key of Object.keys(INITIAL_FIELD_STATE) as (keyof typeof INITIAL_FIELD_STATE)[]) {
        //   // field[key] = INITIAL_FIELD_STATE[key]
        // }

        // _fields[name] = {
        //   ...field,
        //   ...INITIAL_FIELD_STATE,
        //   value: getFieldInitialValue(name),
        // }

        // field.forms?.forEach(form => form.reset())
      }

      // if (!silent) {
      forceUpdate()
      // }
    }

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
