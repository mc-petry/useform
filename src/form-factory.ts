import { useMemo } from 'react'
import { FormOptionsInitializer, FormTransformers, useForm } from '.'
import { ValidationResult } from './form'

interface FactoryProps<TValidationResult> {
  /**
   * Set default transformers
   */
  transformers?: FormTransformers<Record<string, any>, TValidationResult>
}

/**
 * Creates a custom form factory where you can set default transformers
 * and define validation result type
 */
export function formFactory<TValidationResult = ValidationResult>({
  transformers,
}: FactoryProps<TValidationResult> = {}) {
  return function <TFields extends { [key: string]: any }>(
    optionsInitializer: FormOptionsInitializer<TFields, TValidationResult>,
    deps: any[] = []
  ) {
    const options = useMemo(() => {
      const opts = typeof optionsInitializer === 'function' ? optionsInitializer() : optionsInitializer

      if (transformers) {
        opts.transformers = {
          ...transformers,
          ...opts.transformers,
        }
      }

      return opts
    }, deps)

    return useForm<TFields>(options, deps)
  }
}
