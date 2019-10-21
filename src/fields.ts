import { RefObject } from 'react'
import { Form } from './form'

export interface Field<TValue = any, TName extends string = any> {
  readonly ref: RefObject<{ focus: () => void }>

  readonly name: TName

  /**
   * Gets a value that indicates whether a field value changed
   *
   * @default false
   */
  readonly dirty: boolean

  /**
   * Gets a value that indicated whether a field had a focus
   *
   * @default false
   */
  readonly touched: boolean

  /**
   * Gets field current value
   *
   * @default undefined
   */
  readonly value: TValue | undefined

  /**
   * Gets current field error
   *
   * @default null
   */
  readonly error: any

  /**
   * Gets current field warning
   *
   * @default null
   */
  readonly warn: any

  /**
   * Gets current field label
   * Use `transformers` to define field labels
   */
  readonly label: any

  readonly onFocus: () => void
  readonly onBlur: () => void
  readonly onChange: (value: TValue) => void
}

export type Fields<T extends { [key: string]: any }> = {
  [P in keyof T]-?: Field<T[P], Extract<P, string>>
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type InternalField<T = any, P extends keyof T = any> =
  Mutable<Field<T[P], Extract<P, string>>> & {
    forms: Form[]
    addChildForm: (form: Form) => void
    removeChildForm: (form: Form) => void
  }


export type MutableFields<T extends { [key: string]: any }> = {
  [P in keyof T]-?: InternalField<T, P>
}
