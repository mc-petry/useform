import { Field } from '@mc-petry/useform'
import { useCallback } from 'react'
import { TextField, TextFieldProps } from '../text-field'

interface Props extends Omit<TextFieldProps, 'field'> {
  field: Field<number>
}

export function NumberField({ field, ...rest }: Props) {
  const handleOnChange = useCallback((value: string) => {
    if (!/^\d*$/.test(value)) {
      return
    }

    field.onChange(+value)
  }, [field])

  const proxy: Field<string> = {
    ...field,
    onChange: handleOnChange,
    value: field.value ? field.value.toString() : undefined
  }

  return <TextField
    field={proxy}
    {...rest}
  />
}
