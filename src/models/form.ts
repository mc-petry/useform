import { FieldErrors, FieldNames } from './field-definition'
import { Fields } from './fields'

export interface Form<T extends Record<string, any> = any> {
  /**
   * Gets the fields.
   */
  fields: Fields<T>

  /**
   * Validates specific field or fields.
   * @param silent - Prevents focusing invalid field and form rerender.
   * @returns `true` when form validates successfully.
   */
  validate: (fields?: FieldNames<T>, silent?: boolean) => Promise<boolean>

  /**
   * Handles form submit.
   * @example
   *
   * <form onSubmit={handleSubmit((values) => {
   *   ...
   * })}>
   */
  handleSubmit: (onSubmit: (values: T) => void) => (e: React.SyntheticEvent<Element, Event>) => Promise<void>

  /**
   * Gets a value that indicates whether the form has error.
   */
  hasError: (fields?: FieldNames<T>) => boolean

  /**
   * Gets a value that indicates whether the form has warning.
   */
  hasWarn: (fields?: FieldNames<T>) => boolean

  /**
   * Gets a value that indicates whether some field is touched.
   */
  touched: () => boolean

  /**
   * Gets a value that indicates whether some field is dirty.
   */
  dirty: () => boolean

  /**
   * Gets form values.
   */
  getValues: () => T

  /**
   * Sets fields values.
   *
   * @param validate Default - `true`
   */
  setValues: (values: Partial<T>, validate?: boolean | undefined) => void

  /**
   * Sets errors for specific field or fields.
   */
  setErrors: (errors: FieldErrors<T>) => void

  /**
   * Sets warnings for specific field or fields.
   */
  setWarns: (errors: FieldErrors<T>) => void

  /**
   * Resets field or fields to their initial state.
   * @param fields - If undefined resets all fields.
   */
  reset: (fields?: FieldNames<T>) => void

  /**
   * Sets the focus on first field with error.
   */
  focusInvalidField: () => void
}
