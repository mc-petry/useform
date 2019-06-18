import { Field } from './fields'

type InferValue<T> = T extends { [key: string]: infer V } ? V : any

export interface FormTransformers<T, TValidationResult> {
  /**
   * Transforms error
   */
  error?: (
    error: TValidationResult,
    field: Field<InferValue<T>, Extract<keyof T, string>>
  ) => any

  /**
   * Transforms label
   */
  label?: (
    name: Extract<keyof T, string>
  ) => any
}
