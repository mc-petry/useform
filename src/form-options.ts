import { FormTransformers } from './form-transformers'

export interface FormOptions<T, TValidationResult> {
  /**
   * Submission handler. Will not be called if there are errors
   */
  submit?: (values: T) => void

  /**
   * Form transformers
   */
  transformers?: FormTransformers<T, TValidationResult>

  /**
   * Default form behaviour
   *
   * @default false
   */
  validateOnChange?: boolean

  /**
   * Default form behaviour. Keep in mind that pristine (not dirty) fields will not be validated
   *
   * @default true
   */
  validateOnBlur?: boolean
}
