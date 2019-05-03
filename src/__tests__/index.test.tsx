import { useForm } from '../index'
import { renderHook, act } from 'react-hooks-testing-library'

interface UserDTO {
  name: string
  age: number
}

test('initial field state', () => {
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

  expect(state).toEqual(fieldState)
})

test('field state after actions', () => {
  const { result } = renderHook(() => useForm<UserDTO>())
  const { name } = result.current.fields

  act(() => name.onFocus())
  expect(name.touched).toBe(true)

  act(() => name.onChange('Adelina'))
  expect(name.dirty).toBe(true)
})

describe('Field actions', () => {
  test('Validate', () => {
    const { result } = renderHook(() => useForm<UserDTO>({
      name: {
        validate: value => value !== 'Adelina' && 'required',
        warn: value => value !== 'Adelina' && 'required'
      }
    }))

    const { name } = result.current.fields

    act(() => name.onChange('Olga'))
    expect(name.error).toBe(null)
    expect(name.warn).toBe(null)

    act(() => name.onBlur())
    expect(name.error).toBe('required')
    expect(name.warn).toBe('required')
  })

  test('Validate with validateOnChange', () => {
    const { result } = renderHook(() => useForm<UserDTO>({
      name: {
        validate: value => value !== 'Adelina' && 'required',
        warn: value => value !== 'Adelina' && 'required',
        validateOnChange: true
      }
    }))

    const { name } = result.current.fields

    act(() => name.onChange('Olga'))
    expect(name.error).toBe('required')
    expect(name.warn).toBe('required')
  })

  test('Validate with form validateOnChange', () => {
    const { result } = renderHook(() => useForm<UserDTO>(
      {
        name: {
          validate: value => value !== 'Adelina' && 'required',
          warn: value => value !== 'Adelina' && 'required'
        }
      },
      {
        validateOnChange: true
      }
    ))

    const { name } = result.current.fields

    act(() => name.onChange('Olga'))
    expect(name.error).toBe('required')
    expect(name.warn).toBe('required')
  })
})

// test('validate', () => {
//   const { result } = renderHook(() => useForm<UserDTO>({
//     name: {
//       validate: value => (
//         (!value && 'required') ||
//         (value && !['Oksana', 'Adelina'].includes(value) && 'wrong-name')
//       )
//     }
//   }))

//   const { name } = result.current.fields

//   act(() => {
//     name.onChange('Olga')
//     name.onBlur()
//   })
//   expect(name.error).toBe('wrong-name')
// })
