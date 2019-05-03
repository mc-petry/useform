import { useCallback, useMemo, useState, useRef, createRef } from 'react'
import { Mutable } from './utils'
import { FieldDef } from './field-def'
import { Field } from './field'
import { FormOptions } from './form-options'
import { FormTransformers } from './form-transformers'

export { Field, FieldDef, FormOptions, FormTransformers }

export type Fields<T extends { [key: string]: any }> = { [P in keyof T]: Mutable<Field<T[P], Extract<P, string>>> }
export type FieldDefs<T, TValidationResult> = { [P in keyof T]: FieldDef<T[P], T, TValidationResult> }
type FieldsList<T> = Extract<keyof T, string>[] | Extract<keyof T, string>

const BASE_OPTIONS: FormOptions<any, any> = {
  validateOnBlur: true,
  validateOnChange: false
}

export function useForm<
  T extends { [key: string]: any },
  TValidationResult = any
>(
  fieldDefs: Partial<FieldDefs<T, TValidationResult>> = {},
  options?: FormOptions<T, TValidationResult>
) {
  const res = useMemo(() => {
    const defsRef = useRef(fieldDefs as FieldDefs<T, TValidationResult>)
    const optionsRef = useRef<FormOptions<any, any>>({
      ...BASE_OPTIONS,
      ...options
    })

    const [, setState] = useState(true)
    const forceUpdate = useCallback(() => setState(s => !s), [])

    const _fields: Fields<T> = useMemo(() => ({}) as Fields<T>, [])

    const transformError = useCallback((field: Field, error: any) => {
      const transformers = optionsRef.current.transformers

      return error
        ? transformers && transformers.error
          ? transformers.error(error, field)
          : error
        : null
    }, [])

    const validateField = useCallback((name: keyof T) => {
      const field = _fields[name]
      const def = defsRef.current[name]
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
    }, [])

    const handleChange = useCallback((name: keyof T, value: any) => {
      const field = _fields[name]

      field.value = value
      field.dirty = true

      const def = defsRef.current[name]

      // Validate
      const validateOnChange = def.validateOnChange != null
        ? def.validateOnChange
        : optionsRef.current.validateOnChange

      if (validateOnChange) {
        validateField(name)
      }

      // Handle changed event
      if (def.changed) {
        def.changed(value)
      }

      forceUpdate()
    }, [])

    const handleFocus = useCallback((name: keyof T) => {
      const field = _fields[name]

      field.touched = true

      forceUpdate()
    }, [])

    const handleBlur = useCallback((name: keyof T) => {
      if (!_fields[name].dirty) {
        return
      }

      const def = defsRef.current[name]

      const validateOnBlur = def.validateOnBlur != null
        ? def.validateOnBlur
        : optionsRef.current.validateOnBlur!

      if (validateOnBlur) {
        validateField(name)
      }

      forceUpdate()
    }, [])

    const proxy = useMemo(() => new Proxy(_fields, {
      get(target, name: Extract<keyof T, string>) {
        if (!target[name]) {
          target[name] = {
            ref: createRef(),
            name,
            label: undefined,

            dirty: false,
            touched: false,
            error: null,
            warn: null,
            value: undefined,

            onChange: value => handleChange(name, value),
            onFocus: () => handleFocus(name),
            onBlur: () => handleBlur(name)
          }

          if (!defsRef.current[name]) {
            defsRef.current[name] = {}
          }
        }

        return target[name]
      }
    }), [])

    /**
     * Gets a value that indicates whether the form has error
     */
    const hasError = useCallback((fields: FieldsList<T>) => {
      if (typeof fields === 'string') {
        fields = [fields]
      }

      for (const name of fields) {
        if (_fields[name].error) {
          return true
        }
      }
    }, [])

    /**
     * Validates specific field(s)
     */
    const validate = useCallback((fields: FieldsList<T>) => {
      if (typeof fields === 'string') {
        fields = [fields]
      }

      for (const field of fields) {
        validateField(field)
      }

      forceUpdate()
    }, [])

    return {
      fields: proxy,
      hasError,
      validate
    }
  }, [])


  return res
}
