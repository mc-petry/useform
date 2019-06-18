import { useForm } from '../index'
import { renderHook, act } from 'react-hooks-testing-library'

interface UserDTO {
  name: string
  age: number
}

describe('Initial field state', () => {
  test('Default', () => {
    const { result } = renderHook(() => useForm<UserDTO>())
    const { ref, onBlur, onChange, onFocus, ...fieldState } = result.current.fields.name
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

  test('Set errors and warns', () => {
    const { result } = renderHook(() => useForm<UserDTO>())
    const form = result.current

    act(() => form.setErrors({ age: 'required' }))
    act(() => form.setWarns({ name: 'empty' }))
    expect(form.fields.age.error).toBe('required')
    expect(form.fields.name.warn).toBe('empty')
  })
})
