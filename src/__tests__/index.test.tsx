import { useForm, useChildForm } from '../index'
import { renderHook, act } from '@testing-library/react-hooks'
import { InternalField } from '../fields'

interface UserDTO {
  name?: string
  age: number
}

describe('Initial field state', () => {
  test('Default', () => {
    const { result } = renderHook(() => useForm<UserDTO>({
      initialValues: {
        age: 18
      }
    }))
    const { name, age } = result.current.fields
    const { ref, onBlur, onChange, onFocus, addChildForm, removeChildForm, forms, ...fieldState } = name as InternalField
    const state: typeof fieldState = {
      name: 'name',
      label: undefined,
      dirty: false,
      touched: false,
      value: undefined,
      error: null,
      warn: null
    }

    expect(fieldState).toEqual(state)
    expect(age.value).toEqual(18)
  })

  test('Label transformer', () => {
    const { result } = renderHook(() => useForm<UserDTO>(() => ({
      transformers: {
        label: name => name[0].toUpperCase() + name.substr(1)
      }
    })))
    const { age } = result.current.fields

    expect(age.label).toBe('Age')
  })
})

test('Field state after actions', () => {
  const { result } = renderHook(() => useForm<UserDTO>())
  const { name } = result.current.fields

  act(() => name.onFocus())
  expect(name.touched).toBe(true)

  act(() => name.onChange('Adelina'))
  expect(name.dirty).toBe(true)
})

describe('Field actions', () => {
  test('Validate', () => {
    const { result } = renderHook(() => useForm<UserDTO>(() => ({
      fields: {
        name: {
          validate: value => value !== 'Adelina' && 'required',
          warn: value => value !== 'Adelina' && 'required'
        }
      }
    })))

    const { name } = result.current.fields

    act(() => name.onChange('Olga'))
    expect(name.error).toBe(null)
    expect(name.warn).toBe(null)

    act(() => name.onBlur())
    expect(name.error).toBe('required')
    expect(name.warn).toBe('required')
  })

  test('Validate array', () => {
    const { result } = renderHook(() => useForm<UserDTO>(() => ({
      fields: {
        age: {
          validate: [
            value => !value && 'required',
            value => value! < 18 && 'too-young'
          ]
        }
      }
    })))

    const { fields: { age }, setValues, validate } = result.current

    act(() => { validate() })
    expect(age.error).toBe('required')

    act(() => setValues({ age: 17 }, true))
    expect(age.error).toBe('too-young')

    act(() => setValues({ age: 21 }, true))
    expect(age.error).toBeNull()
  })

  test('Validate with validateOnChange', () => {
    const { result } = renderHook(() => useForm<UserDTO>(() => ({
      fields: {
        name: {
          validate: value => value !== 'Adelina' && 'required',
          warn: value => value !== 'Adelina' && 'required',
          validateOnChange: true
        }
      }
    })))

    const { name } = result.current.fields

    act(() => name.onChange('Olga'))
    expect(name.error).toBe('required')
    expect(name.warn).toBe('required')
  })

  test('Validate with form validateOnChange', () => {
    const { result } = renderHook(() => useForm<UserDTO>(() => ({
      fields: {
        name: {
          validate: value => value !== 'Adelina' && 'required',
          warn: value => value !== 'Adelina' && 'required'
        },
      },
      validateOnChange: true
    })))

    const { name } = result.current.fields

    act(() => name.onChange('Olga'))
    expect(name.error).toBe('required')
    expect(name.warn).toBe('required')
  })

  test('Set values', () => {
    const { result } = renderHook(() => useForm<UserDTO>())
    const form = result.current

    const values: UserDTO = {
      age: 18,
      name: 'John'
    }

    act(() => form.setValues(values))

    expect(form.getValues()).toEqual(values)
  })

  test('Set errors and warns', () => {
    const { result } = renderHook(() => useForm<UserDTO>())
    const form = result.current

    act(() => form.setErrors({ age: 'required' }))
    act(() => form.setWarns({ name: 'empty' }))
    expect(form.fields.age.error).toBe('required')
    expect(form.fields.name.warn).toBe('empty')
  })
})

describe('Children forms', () => {
  test('Object', () => {
    interface UserData {
      name: string
    }

    interface FormData {
      users: UserData[]
    }

    const { result: { current: parent } } = renderHook(() => useForm<FormData>(() => ({
      initialValues: {
        users: [
          { name: 'John' }
        ]
      }
    })))

    const { result: { current: child } } = renderHook(() => useForm<UserData>(() => ({
      fields: {
        name: {
          validate: v => v && v.length < 10 && 'min-length'
        }
      }
    })))

    const { result: { current: proxy } } = renderHook(() => useChildForm(0, parent.fields.users, child))

    act(() => { parent.validate() })

    expect(proxy.fields.name.value).toBe('John')
    expect(proxy.fields.name.error).toBe('min-length')

    act(() => { proxy.fields.name.onChange('Jesika') })

    expect(parent.fields.users.value).toEqual([{ name: 'Jesika' } as UserData])

    act(() => { parent.reset() })

    expect(proxy.fields.name.value).toBe(undefined)
    expect(proxy.fields.name.error).toBe(null)
  })
})
