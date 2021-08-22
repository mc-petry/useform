import { useEffect, useMemo } from 'react'
import { Field, Fields, Form, FormOptions, useForm } from '.'

export function useFormChild<T extends Record<string, any>>(
  index: number,
  rootField: Field<T[]>,
  options: Pick<FormOptions<T, any>, 'fields' | 'validationSchema'>
) {
  const childForm = useForm(options)

  useEffect(() => {
    rootField.addForm(childForm as Form<any>)
    return () => {
      rootField.removeForm(childForm as Form<any>)
    }
  }, [rootField])

  const proxy = useMemo(() => {
    return new Proxy({} as Fields<T>, {
      get(target, name: Extract<keyof T, string> & 'index') {
        if (!target[name]) {
          const field = childForm.fields[name]
          target[name] = field

          const originOnChange = field.onChange
          field.onChange = (value: any) => {
            originOnChange(value)
            const arr = rootField.value!

            arr[index] = {
              ...arr[index],
              [name]: value,
            }

            rootField.onChange(arr)
          }

          const originOnFocus = field.onFocus
          field.onFocus = () => {
            originOnFocus()
            rootField.onFocus()
          }

          const originOnBlur = field.onBlur
          field.onBlur = () => {
            originOnBlur()
            rootField.onBlur()
          }
        }

        return target[name]
      },
    })
  }, [])

  return { fields: proxy }
}
