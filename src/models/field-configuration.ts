import { FieldNames } from './field-name'
import { ValidationRules } from './validation'

export interface FieldConfiguration<TValue, TFields, TValidationResult> {
  /**
   * Defines the warning validation rules.
   * Works the same as {@link ValidationSchema} except it doesn't block form submission.
   */
  warn?: ValidationRules<TValue, TFields, TValidationResult>

  /**
   * Defines the dependent fields that must be validated after current field. Skips untouched fields.
   */
  dependent?: FieldNames<TFields>

  /**
   * Overrides default form behaviour for current field.
   */
  validateOnChange?: boolean

  /**
   * Overrides default form behaviour for current field.
   */
  validateOnBlur?: boolean
}

export interface FieldConfigurationDynamic<TValue, TFields, TValidationResult> {
  /**
   * {@link ValidationRules}
   */
  validate?: ValidationRules<TValue, TFields, TValidationResult>
}
