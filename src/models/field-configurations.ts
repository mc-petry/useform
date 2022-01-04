import { FieldConfiguration } from './field-configuration'

export type FieldConfigurations<T, TValidationResult> = {
  [P in keyof T]-?: FieldConfiguration<T[P], T, TValidationResult>
}
