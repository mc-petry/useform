import { useEffect, useReducer } from 'react'
import { Field } from '.'

/**
 * Force update component when field value changed.
 */
export function useFieldWatch(field: Field) {
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  useEffect(() => {
    const origin = field.onChange

    field.onChange = async value => {
      await origin(value)
      forceUpdate()
    }

    return () => {
      field.onChange = origin
    }
  }, [field])
}
