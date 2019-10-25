import { Form, InternalForm } from './form'
import { useEffect, useMemo, useRef, useCallback } from 'react'
import { Field, InternalField } from './fields'

export interface PrimitiveFormFields<T> {
  index: T
}

/**
 * @param index Current index
 * @param field Field from parent form
 * @param child Child form
 * @param silent Prevents rerender parents form. Increases performance
 */
export function useChildForm<T extends { [key: string]: any } | string>(
  index: number,
  field: Field<T[]>,
  child: T extends object ? Form<T> : Form<PrimitiveFormFields<T>>,
  silent: boolean = false
) {
  // Set local form values from parent
  const isFirstRender = useRef(true)
  const prevFieldValue = useRef<T>()
  const isComplex = useRef(false)

  const childForm = child as Form as InternalForm

  const updateValue = useCallback(() => {
    const value = field.value![index]
    isComplex.current = typeof value === 'object'

    childForm.setSilent(true)
    child.setValues(
      isComplex.current
        ? field.value![index] as any
        : { index: field.value![index] }
    )
    childForm.setSilent(false)
  }, [field.value![index]])

  if (isFirstRender.current) {
    updateValue()
    isFirstRender.current = false
  }

  if (prevFieldValue.current !== field.value![index]) {
    prevFieldValue.current = field.value![index]
    updateValue()
  }

  // Add child form to parent one
  useEffect(() => {
    (field as InternalField).addChildForm(child as Form)

    return () => {
      (field as InternalField).removeChildForm(child as Form)
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

            if (!silent) {
              field.onChange(parent)
            }
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
