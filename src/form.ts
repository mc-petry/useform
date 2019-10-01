import { Fields } from './fields'
import { FieldDefs } from './field-defs'

export type ValidationResult = any
export type FieldName<T> = Extract<keyof T, string>
export type FieldsList<T> = FieldName<T>[] | FieldName<T>
export type FieldErrors<T> = { [field in FieldName<T>]?: ValidationResult }

export interface Form<T extends { [key: string]: any } = any> {
  fields: Fields<T>

  /**
   * Validates specific field(s)
   * @returns `true` when form validates successfully
   */
  validate: (fields?: FieldsList<T>) => boolean

  /**
   * Handles form submit. Typically should be passed into `<form>`
   */
  handleSubmit: (e: React.SyntheticEvent<Element, Event>) => void

  /**
   * Gets a value that indicates whether the form has error
   */
  hasError: (fields?: FieldsList<T>) => boolean

  /**
   * Gets a value that indicates whether the form has error
   */
  hasWarn: (fields?: FieldsList<T>) => boolean

  /**
   * Gets a value that indicates whether some field is touched
   */
  touched: () => boolean

  /**
   * Gets a value that indicates whether some field is dirty
   */
  dirty: () => boolean

  /**
   * Gets form values
   */
  getValues: () => T

  /**
   * Sets form values
   */
  setValues: (values: Partial<T>, shouldValidate?: boolean | undefined) => void

  /**
   * Sets errors for specific field(s)
   */
  setErrors: (errors: FieldErrors<T>) => void

  /**
   * Sets warns for specific field(s)
   */
  setWarns: (errors: FieldErrors<T>) => void

  /**
   * Resets fields to their initial state
   */
  reset: (fields?: FieldsList<T>) => void

  /**
   * Removes the fields. Useful for dynamic fields
   */
  remove: (fields: FieldsList<T>) => void

  /**
   * Adds the dynamic fields.
   */
  add: (fields: FieldDefs<T, ValidationResult>) => void

  /**
   * Sets focus on first field with error
   */
  focusInvalidField: () => void
}
