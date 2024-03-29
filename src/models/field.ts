import { RefObject } from 'react'
import { Form } from './form'

export interface Field<TValue extends unknown = any, TName extends string = any> {
  /**
   * Gets the reference object that should normally be passed to the input component.
   * This will be used to focus invalid field.
   *
   * @example
   * // Usage with input
   * <input ref={field.ref as React.RefObject<HTMLInputElement>} />
   */
  readonly ref: RefObject<{ focus: () => void }>

  /**
   * Gets the field name.
   */
  readonly name: TName

  /**
   * Gets a value that indicates whether the field value has changed.
   *
   * @default false
   */
  readonly dirty: boolean

  /**
   * Gets a value that indicates whether the field has user interaction.
   *
   * @default false
   */
  readonly touched: boolean

  /**
   * Gets the current value.
   *
   * @default undefined
   */
  readonly value: TValue | undefined

  /**
   * Gets the error.
   *
   * @default null
   */
  readonly error: any

  /**
   * Gets the warning.
   *
   * @default null
   */
  readonly warn: any

  onFocus: () => void
  onBlur: () => Promise<void>
  onChange: (value: TValue) => Promise<void>

  /**
   * Gets the children forms.
   *
   * @internal
   */
  forms?: Form[]

  /**
   * Adds child form.
   *
   * @internal
   */
  addForm: (form: Form) => void

  /**
   * Removes child form.
   *
   * @internal
   */
  removeForm: (form: Form) => void
}
