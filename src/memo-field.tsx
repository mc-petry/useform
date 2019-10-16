import React, { ComponentType, Component } from 'react'
import { Field } from '.'

function equal(a: any, b: any) {
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false
    }
  }
  return true
}

/**
 * Like React.memo provides shallow comparision of props and field props
 */
export function memoField<T, P extends { field: Field }>(FieldComponent: ComponentType<P> & T): T {
  return class MemoizedField extends Component<P> {
    _field: Field | undefined

    shouldComponentUpdate(nextProps: P) {
      if (!equal(this._field, nextProps.field)) {
        return true
      }

      return !equal(this.props, nextProps)
    }

    render() {
      // Save latest field props
      this._field = { ...this.props.field }

      return <FieldComponent
        {...this.props as any}
      />
    }
  } as any
}
