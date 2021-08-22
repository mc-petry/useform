import { useMemo } from 'react'
import { FormOptions, FormTransformers, useForm } from '.'
import { ValidationResultDefault } from './models/field-definition'

interface FactoryProps<TValidationResult> {
  validateOnBlur?: boolean
  validateOnChange?: boolean
  transformers?: FormTransformers<Record<string, any>, TValidationResult>
}

/**
 * Returns a custom factory where you can set default form behaviour.
 */
export function formFactory<TValidationResult = ValidationResultDefault>(fn?: () => FactoryProps<TValidationResult>) {
  return function <TFields extends { [key: string]: any }>(
    defaults: FormOptions<TFields, TValidationResult> = {},
    deps: any[] = []
  ) {
    const overrides = fn ? fn() : {}
    const options = useMemo(() => {
      if (overrides.transformers) {
        defaults.transformers = {
          ...overrides.transformers,
          ...defaults.transformers,
        }
      }

      return defaults
    }, deps)

    return useForm<TFields>(options, deps)
  }
}
