import { Field } from './field'
import { FieldName } from './field-name'

type InferValue<T> = T extends { [key: string]: infer V } ? V : any

export interface FormTransformers<T, TValidationResult> {
  /**
   * Transforms error or warning.
   */
  error?: (error: TValidationResult, field: Field<InferValue<T>, FieldName<T>>) => any
}
