import { useEffect, useMemo } from 'react'
import { Field, Fields, Form, FormOptions, useForm } from '.'
import { ValidationResultDefault } from './models/field-definition'

/**
 * Creates subform for array field.
 *
 * You may want to use helper methods {@link fieldArrayRemoveItem} and
 * {@link fieldArrayAddItem} for adding and removing items or implement your own.
 *
 * @param rootField Array field from parent form.
 * @param index Current index of root field value.
 */
export function useFieldArray<T extends Record<string, any>, TValidationResult = ValidationResultDefault>(
  rootField: Field<T[]>,
  index: number,
  options?: Pick<FormOptions<T, TValidationResult>, 'fields' | 'validationSchema'>
) {
  const childForm = useForm(options, [rootField])

  useEffect(() => {
    rootField.addForm(childForm as Form)
    return () => rootField.removeForm(childForm as Form)
  }, [childForm])

  const proxy = useMemo(() => {
    /**
     * Sets default values from {@link Form.initialValues}.
     */
    if (rootField.value?.[index] !== undefined) {
      childForm.setValues(rootField.value[index])
    }

    return new Proxy({} as Fields<T>, {
      get(target, name: Extract<keyof T, string> & 'index') {
        if (!target[name]) {
          const field = childForm.fields[name]
          target[name] = field

          const originOnChange = field.onChange
          field.onChange = async (value: any) => {
            await originOnChange(value)
            const arr = rootField.value!

            /**
             * Cloning an existing array prevents the source from being changed from {@link Form.initialValues}.
             */
            const newValue = [...arr]
            newValue[index] = {
              ...newValue[index],
              [name]: value,
            }

            await rootField.onChange(newValue)
          }

          const originOnFocus = field.onFocus
          field.onFocus = () => {
            originOnFocus()
            rootField.onFocus()
          }

          const originOnBlur = field.onBlur
          field.onBlur = async () => {
            await originOnBlur()
            await rootField.onBlur()
          }
        }

        return target[name]
      },
    })
  }, [rootField])

  return { fields: proxy }
}

export function fieldArrayRemoveItem<T>(field: Field<T[]>, index: number) {
  field.onChange(field.value!.filter((_, i) => i !== index))
}

export function fieldArrayAddItem<T>(field: Field<T[]>, item: T, index = field.value!.length) {
  const arr = field.value!
  arr.splice(index, 0, item)
  field.onChange(arr)
  field.onBlur()
}
