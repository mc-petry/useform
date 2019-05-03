type ValidateFn<V, R> = (value: V | undefined) => R
type ChangedFn<V> = (newValue: V | undefined) => void

export interface FieldDef<TValue, TFields, TValidationResult> {
  /**
   * Validates specific field.
   * @returns Error or success: `undefined | false`.
   * @example
   * name => name === 'Adelina' || 'wrong-name'
   * @example
   * age => (age < 18 && 'too-young') || (age > 75 && 'too-old')
   */
  validate?: ValidateFn<TValue, TValidationResult>

  /**
   * Same as `validate` but does not block form submission
   */
  warn?: ValidateFn<TValue, TValidationResult>

  /**
   * Calls after value changed
   */
  changed?: ChangedFn<TValue>

  /**
   * Dependent fields that must be validated after this field
   */
  dependent?: ReadonlyArray<Extract<keyof TFields, string>> | (Extract<keyof TFields, string>)

  /**
   * Overrides default form behaviour for specific field
   */
  validateOnChange?: boolean

  /**
   * Overrides default form behaviour for specific field
   */
  validateOnBlur?: boolean
}
