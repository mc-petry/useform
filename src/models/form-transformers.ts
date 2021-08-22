import { Field } from './field'

type InferValue<T> = T extends { [key: string]: infer V } ? V : any

export interface FormTransformers<T, TValidationResult> {
  /**
   * Transforms error or warning
   */
  error?: (error: TValidationResult, field: Field<InferValue<T>, Extract<keyof T, string>>) => any

  /**
   * Transforms label
   */
  label?: (name: Extract<keyof T, string>) => any
}
