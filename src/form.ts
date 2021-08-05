import { FieldDefs } from './field-defs'
import { Fields } from './fields'

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
  validate: (fields?: FieldsList<T>) => Promise<boolean>

  /**
   * Handles form submit. Typically should be passed into `<form>`
   */
  handleSubmit: (e: React.SyntheticEvent<Element, Event>) => Promise<void>

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
  removeField: (fields: FieldsList<T>) => void

  /**
   * Adds the dynamic fields.
   */
  addField: (fields: FieldDefs<T, ValidationResult>) => void

  /**
   * Sets focus on first field with error
   */
  focusInvalidField: () => void
}

export interface InternalForm<T = any> extends Form<T> {
  /**
   * Prevents rerender on any type of operations
   */
  setSilent: (value: boolean) => void

  /**
   * Validates child form without focusing invalid field
   */
  subformValidate: () => void
}
