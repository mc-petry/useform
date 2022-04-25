import { FieldConfiguration, FieldConfigurationDynamic } from './field-configuration'
import { FieldConfigurations } from './field-configurations'
import { FieldNames } from './field-name'
import { FormTransformers } from './form-transformers'
import { ValidationSchema } from './validation'

export interface FormOptions<T, TValidationResult> {
  /**
   * Fields definitions
   */
  fields?: Partial<FieldConfigurations<T, TValidationResult>>

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
  dynamic?: (
    fieldName: string
  ) => FieldConfiguration<any, T, TValidationResult> & FieldConfigurationDynamic<any, T, TValidationResult>

  /**
   * Defines the custom validation schema.
   * Classic rule must return success as `false | undefined` or error of other types:
   *
   * Custom validation rules:
   * @example value => !value && 'Required'
   * @example value => (!value && 'Required') || (value.length < 10 && 'Min length is 10')
   * @example [
   *  value => !value && 'Required',
   *  value => value!.length < 5 && 'Min length is 5'
   * ]
   */
  schema?: ValidationSchema<T, TValidationResult>

  /**
   * Allows to force update on field changes without using {@link useFieldWatch}
   */
  watch?: boolean | FieldNames<T>

  /**
   * Initial field values.
   */
  initial?: Partial<T>
}
