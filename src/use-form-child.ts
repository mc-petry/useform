import { useMemo } from 'react'
import { Field, Fields, Form, FormOptions, useForm } from '.'

export function useFormChild<T extends Record<string, any>>(
  index: number,
  rootField: Field<T[]>,
  options: Pick<FormOptions<T, any>, 'fields' | 'validationSchema'>
) {
  const childForm = useForm(options, [rootField])

  // useEffect(() => {
  //   childForm.reset = () => {
  //     reset:
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('[ useFormChild ] Attach form')
  //   rootField.addForm(childForm as Form)

  //   debugger
  //   if (rootField.value !== undefined && rootField.value[index] !== undefined) {
  //     childForm.setValues(rootField.value[index])
  //   }

  //   return () => {
  //     console.log('[ useFormChild ] Remove form')
  //     rootField.removeForm(childForm as Form)
  //   }
  // }, [rootField])

  const proxy = useMemo(() => {
    console.log(`[ useChildForm ] create proxy`)
    rootField.addForm(childForm as Form)
    console.log(rootField.value?.[index])

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

            arr[index] = {
              ...arr[index],
              [name]: value,
            }

            await rootField.onChange(arr)
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
