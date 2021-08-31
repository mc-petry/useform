import { FieldDefinition } from './field-definition'

export type FieldDefinitions<T, TValidationResult> = {
  [P in keyof T]-?: FieldDefinition<T[P], T, TValidationResult>
}
