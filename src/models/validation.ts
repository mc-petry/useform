import { FieldName } from './field-name'
import { Fields } from './fields'

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

export type FieldErrors<T> = { [field in FieldName<T>]?: ValidationResultDefault }
