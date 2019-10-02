import { Field } from './fields'

export function removeItem<T>(field: Field<T[]>, index: number) {
  const arr = field.value!

  arr.splice(index, 1)
  field.onChange(arr)
}

export function addItem<T>(field: Field<T[]>, item: T) {
  field.onChange(field.value!.concat(item))
}
