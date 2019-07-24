import { FormTransformers } from './form-transformers'
import { FieldDefs, FieldDef } from './field-defs'

export interface FormOptions<T, TValidationResult> {
  /**
   * Fields definitions
   */
  fields?: Partial<FieldDefs<T, TValidationResult>>

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

  /**
   * Dynamic field configuration
   */
  fieldConfig?: (fieldName: string) => FieldDef<any, T, TValidationResult> | undefined

  /**
   * Initial field values
   */
  initialValues?: T
}
