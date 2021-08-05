import { useMemo } from 'react'
import { FormOptionsInitializer, FormTransformers, useForm } from '.'
import { ValidationResult } from './form'

interface FactoryProps<TValidationResult> {
  validateOnBlur?: boolean
  validateOnChange?: boolean
  transformers?: FormTransformers<Record<string, any>, TValidationResult>
}

/**
 * Creates a custom form factory where you can set default form options
 * and define validation result type
 */
export function formFactory<TValidationResult = ValidationResult>(fn?: () => FactoryProps<TValidationResult>) {
  return function <TFields extends { [key: string]: any }>(
    optionsInitializer: FormOptionsInitializer<TFields, TValidationResult>,
    deps: any[] = []
  ) {
    const overrides = fn ? fn() : {}
    const options = useMemo(() => {
      const opts = typeof optionsInitializer === 'function' ? optionsInitializer() : optionsInitializer

      if (overrides.transformers) {
        opts.transformers = {
          ...overrides.transformers,
          ...opts.transformers,
        }
      }

      return opts
    }, deps)

    return useForm<TFields>(options, deps)
  }
}
