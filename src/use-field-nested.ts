import { useEffect, useMemo } from 'react'
import { Field, Fields, Form, FormOptions, useForm } from '.'

/**
 * Allows you to use nested properties as fields.
 *
 * Useful for forms like this where you need to edit `firstName` and `lastName`:
 * ```ts
 * interface FormData {
 *   community: string
 *   user: {
 *     firstName: string
 *     lastName: string
 *   }
 * }
 * ```
 */
export function useFieldNested<T extends Record<string, any>>(
  rootField: Field<T>,
  options?: Pick<FormOptions<T, any>, 'fields' | 'schema'>
) {
  const childForm = useForm(options, [rootField])

  useEffect(() => {
    rootField.addForm(childForm as Form)
    return () => rootField.removeForm(childForm as Form)
  }, [childForm])

  const proxy = useMemo(() => {
    /**
     * Sets default values from {@link Form.initial}.
     */
    if (rootField.value) {
      childForm.setValues(rootField.value)
    }

    return new Proxy({} as Fields<T>, {
      get(target, name: Extract<keyof T, string>) {
        if (!target[name]) {
          const field = childForm.fields[name]
          target[name] = field

          const originOnChange = field.onChange
          field.onChange = async (value: any) => {
            await originOnChange(value)
            await rootField.onChange({
              ...(rootField.value! || {}),
              [name]: value,
            })
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
