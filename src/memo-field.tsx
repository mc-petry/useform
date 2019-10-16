import React, { ComponentType, Component } from 'react'
import { Field } from '.'

function areEqualShallow(a: any, b: any) {
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false
    }
  }
  return true
}

export function memoField<T extends ComponentType<{ field: Field }>>(FieldComponent: T) {
  return class MemoizedField extends Component<{ field: Field }> {
    _field: Field | undefined

    shouldComponentUpdate(nextProps: { field: Field }) {
      if (!areEqualShallow(this._field, nextProps.field)) {
        return true
      }

      return !areEqualShallow(this.props, nextProps)
    }

    render() {
      this._field = { ...this.props.field }

      return <FieldComponent
        {...this.props as any}
      />
    }
  }
}
