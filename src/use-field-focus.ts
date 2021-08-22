import { useEffect, useState } from 'react'
import { Field } from '.'

/**
 * @returns `true` when field focused.
 */
export function useFieldFocus(field: Field) {
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const originFocus = field.onFocus
    const originBlur = field.onBlur

    field.onFocus = () => {
      originFocus()
      setFocused(true)
    }

    field.onBlur = () => {
      originBlur()
      setFocused(false)
    }

    return () => {
      field.onFocus = originFocus
      field.onBlur = originBlur
    }
  }, [field])

  return focused
}
