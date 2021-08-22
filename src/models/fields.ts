import { Field } from './field'

export type Fields<T extends Record<string, any>> = {
  [P in keyof T]-?: Field<T[P], Extract<P, string>>
}
