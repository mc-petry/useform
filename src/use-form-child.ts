import { useEffect, useMemo } from 'react'
import { Field, Fields, Form, FormOptions, useForm } from '.'

export function useFormChild<T extends Record<string, any>>(
  index: number,
  rootField: Field<T[]>,
  options: Pick<FormOptions<T, any>, 'fields' | 'validationSchema'>
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
