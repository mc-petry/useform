import { Form } from './form'
import { useEffect, useMemo, useRef } from 'react'
import { Field, InternalField } from './fields'

export interface PrimitiveFormFields<T> {
  index: T
}

export function useChildForm<T extends { [key: string]: any } | string>(
  index: number,
  field: Field<T[]>,
  child: T extends object ? Form<T> : Form<PrimitiveFormFields<T>>
) {
  // Set local form values from parent
  const isComplex = useRef(false)

  useEffect(() => {
    const value = field.value![index]
    isComplex.current = typeof value === 'object'
    child.setValues(
      isComplex.current
        ? field.value![index] as any
        : { index: field.value![index] }
    )
  }, [field.value![index]])

  // Add child form to parent one
  useEffect(() => {
    (field as InternalField).addChildForm(child as any)

    return () => {
      (field as InternalField).removeChildForm(child as any)
    }
  }, [])

  const proxy = useMemo(() => {
    const fields = new Proxy({} as typeof child.fields, {
      get(_target, name: Extract<keyof T, string> & 'index') {
        return {
          ...child.fields[name],
          onChange: (value: any) => {
            const parent = field.value!

            parent[index] = isComplex.current
              ? {
                ...parent[index] as {},
                [name]: value
              }
              : value

            field.onChange(parent)
            child.fields[name].onChange(value)
          }
        }
      }
    })

    return {
      ...child,
      fields
    }
  }, [field, child.fields])

  return proxy as Pick<
    typeof child,
    'fields' |
    'hasError' |
    'hasWarn' |
    'touched' |
    'dirty' |
    'getValues' |
    'focusInvalidField'
  >
}

export function removeFieldItem<T>(field: Field<T[]>, index: number) {
  field.onChange(field.value!.filter((_, i) => i !== index))
}

export function addFieldItem<T>(field: Field<T[]>, item: T) {
  field.onChange(field.value!.concat(item))
}
