import { RefObject } from 'react'
import { Form } from './form'

export interface Field<TValue extends unknown = any, TName extends string = any> {
  /**
   * Gets the reference object that must be passed in component with method `focus`.
   *
   * Usage with input: `<input ref={field.ref as RefObject<HTMLInputElement>} />`
   */
  readonly ref: RefObject<{ focus: () => void }>

  /**
   * Gets the field name.
   */
  readonly name: TName

  /**
   * Gets a value that indicates whether the field value has changed.
   * @default false
   */
  readonly dirty: boolean

  /**
   * Gets a value that indicates whether the field has user interaction.
   * @default false
   */
  readonly touched: boolean

  /**
   * Gets the current value.
   * @default undefined
   */
  readonly value: TValue | undefined

  /**
   * Gets the error.
   * @default null
   */
  readonly error: any

  /**
   * Gets the warning.
   * @default null
   */
  readonly warn: any

  /**
   * Gets the label.
   */
  readonly label: any

  onFocus: () => void
  onBlur: () => void
  onChange: (value: TValue) => void

  /**
   * Gets the children forms
   * @internal
   */
  forms?: Form[]

  /**
   * Adds child form.
   * @internal
   */
  addForm: (form: Form) => void

  /**
   * Removes child form.
   * @internal
   */
  removeForm: (form: Form) => void
}
