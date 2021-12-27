import { FieldDefinition, FieldNames, ValidationSchema } from './field-definition'
import { FieldDefinitions } from './field-definitions'
import { FormTransformers } from './form-transformers'

// TODO:
export interface FormOptions<T, TValidationResult> {
  /**
   * Fields definitions
   */
  fields?: Partial<FieldDefinitions<T, TValidationResult>>

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
  dynamic?: (fieldName: string) => FieldDefinition<any, T, TValidationResult> | undefined

  /**
   * Initial field values
   */
  initial?: Partial<T> | null

  /**
   * Validation schema
   *
   * Has lower priority than [field].validate
   */
  schema?: ValidationSchema<T, TValidationResult>

  /**
   * Allows to force update on field changes without using {@link useFieldWatch}
   */
  watch?: boolean | FieldNames<T>
}
