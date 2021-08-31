import { Fields } from './fields'

export type FieldName<T> = Extract<keyof T, string>
export type FieldNames<T> = FieldName<T>[] | FieldName<T>
export type FieldErrors<T> = { [field in FieldName<T>]?: ValidationResultDefault }

export type ValidationResultDefault = any
export type ValidationResult<R> = R | false | undefined
export type ValidationRule<V, T, R> = (
  value: V,
  fields: Fields<T>
) => ValidationResult<R> | Promise<ValidationResult<R>>
export type ValidationRules<V, T, R> = ValidationRule<V, T, R> | ValidationRule<V, T, R>[]
export type ValidationSchema<T extends Record<string, any> = any, TValidationResult = ValidationResultDefault> = {
  [P in keyof T]?: ValidationRules<T[P], T, TValidationResult>
}

export interface FieldDefinition<TValue, TFields, TValidationResult> {
  /**
   * Defines the error validation rules.
   * Each rule must return success as `false | undefined` or error of other types.
   *
   * @example value => !value && 'Required'
   * @example value => (!value && 'Required') || (value.length < 10 && 'Min length is 10')
   * @example [
   *  value => !value && 'Required',
   *  value => value!.length < 5 && 'Min length is 5'
   * ]
   */
  validate?: ValidationRules<TValue, TFields, TValidationResult>

  /**
   * Defines the warning validation rules.
   * Works the same as {@link FieldDefinition.validate} except it doesn't block form submission.
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
