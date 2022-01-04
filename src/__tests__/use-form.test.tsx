import { act, renderHook } from '@testing-library/react-hooks'
import { useMemo } from 'react'
import { formFactory, useForm } from '../index'
import { delay } from './utils'

interface UserDTO {
  name?: string
  age: number
}

describe('Creation', () => {
  test('Initial field values', () => {
    const { result } = renderHook(() =>
      useForm<UserDTO>({
        initial: {
          age: 18,
        },
      })
    )
    const { name, age } = result.current.fields
    const { ref, onBlur, onChange, onFocus, addForm, removeForm, forms, ...fieldState } = name
    const state: typeof fieldState = {
      name: 'name',
      dirty: false,
      touched: false,
      value: undefined,
      error: null,
      warn: null,
    }

    expect(fieldState).toEqual(state)
    expect(age.value).toEqual(18)
  })

  test('schema', async () => {
    const {
      result: { current: form },
    } = renderHook(() =>
      useForm<UserDTO>({
        schema: {
          age: v => !v && 'schema-required',
          name: v => !v && 'required',
        },
      })
    )

    await act(async () => {
      await form.validate()
    })

    expect(form.fields.age.error).toBe('required')
    expect(form.fields.name.error).toBe('required')
  })
})

describe('Events', () => {
  test('field.onFocus', () => {
    const { result } = renderHook(() =>
      useForm<UserDTO>({
        schema: {
          age: v => !v && 'required',
          name: v => v !== 'John' && 'not a John',
        },
      })
    )
    const { name } = result.current.fields

    act(() => name.onFocus())

    expect(name.touched).toBe(true)
    expect(name.dirty).toBe(false)
  })

  test('field.onChange', async () => {
    const { result } = renderHook(() =>
      useForm<UserDTO>({
        schema: {
          age: v => !v && 'required',
          name: v => v !== 'John' && 'not a John',
        },
      })
    )
    const { name, age } = result.current.fields

    await act(async () => await name.onChange('Adelina'))

    expect(name.dirty).toBe(true)
    expect(name.value).toBe('Adelina')
  })

  test('field.onBlur', async () => {
    const { result } = renderHook(() =>
      useForm<UserDTO>({
        schema: {
          age: v => !v && 'required',
          name: v => v !== 'John' && 'not a John',
        },
      })
    )
    const { name, age } = result.current.fields

    await act(async () => {
      await age.onBlur()
      await name.onChange('Adelina')
      await name.onBlur()
    })

    expect(age.error).toBeNull()
    expect(name.error).toBe('not a John')
  })
})

describe('Actions', () => {
  test('form.validate', async () => {
    const { result } = renderHook(() =>
      useForm<UserDTO>({
        fields: {
          name: {
            warn: value => value !== 'Adelina' && 'required',
          },
        },
        schema: {
          name: value => value !== 'Adelina' && 'required',
        },
      })
    )

    const { name } = result.current.fields

    await act(async () => {
      name.onChange('Olga')
      await delay()
    })

    expect(name.error).toBe(null)
    expect(name.warn).toBe(null)

    await act(async () => {
      name.onBlur()
      await delay()
    })

    expect(name.error).toBe('required')
    expect(name.warn).toBe('required')
  })

  test('form.validate array', async () => {
    const { result } = renderHook(() =>
      useForm<UserDTO>({
        schema: {
          age: [value => !value && 'required', value => value! < 18 && 'too-young'],
        },
      })
    )

    const {
      fields: { age },
      setValues,
      validate,
    } = result.current

    await act(async () => {
      await validate()
    })
    expect(age.error).toBe('required')

    await act(async () => {
      setValues({ age: 17 }, true)
      await delay()
    })
    expect(age.error).toBe('too-young')

    await act(async () => {
      setValues({ age: 21 }, true)
      await delay()
    })
    expect(age.error).toBeNull()
  })

  test('form.validate [ field.validateOnChange = true ]', async () => {
    const { result } = renderHook(() =>
      useForm<UserDTO>({
        fields: {
          name: {
            warn: value => value !== 'Adelina' && 'required',
            validateOnChange: true,
          },
        },
        schema: {
          name: value => value !== 'Adelina' && 'required',
        },
      })
    )

    const { name } = result.current.fields

    await act(async () => {
      name.onChange('Olga')
      await delay()
    })

    expect(name.error).toBe('required')
    expect(name.warn).toBe('required')
  })

  test('form.validate [ form.validateOnChange = true ]', async () => {
    const { result } = renderHook(() =>
      useForm<UserDTO>({
        fields: {
          name: {
            warn: value => value !== 'Adelina' && 'required',
          },
        },
        validateOnChange: true,
        schema: {
          name: value => value !== 'Adelina' && 'required',
        },
      })
    )

    const { name } = result.current.fields

    await act(async () => {
      name.onChange('Olga')
      await delay()
    })

    expect(name.error).toBe('required')
    expect(name.warn).toBe('required')
  })

  test('form.validate [ after form.setErrors ]', async () => {
    const {
      result: { current: form },
    } = renderHook(() => useForm<UserDTO>())

    await act(async () => {
      form.setErrors({ name: 'invalid' })
      await form.validate()
    })

    expect(form.fields.name.error).toBeNull()
  })

  test('form.validate [ async ]', async () => {
    const {
      result: { current: form },
    } = renderHook(() =>
      useForm<UserDTO>({
        schema: {
          name: [
            v => !v && 'required',
            async v => {
              await delay(100)
              return 'async'
            },
          ],
        },
        initial: {
          name: 'Yamaha',
          age: 18,
        },
      })
    )

    await act(async () => {
      await form.validate()
    })

    expect(form.fields.name.error).toBe('async')
  })

  test('form.handleSubmit', async () => {
    let submitted = false

    const {
      result: { current: form },
    } = renderHook(() =>
      useForm<UserDTO>({
        schema: {
          name: v => !v && 'required',
        },
      })
    )

    form.handleSubmit(() => (submitted = true))

    await act(async () => {
      form.handleSubmit({ preventDefault: () => undefined } as any)
      await delay()
    })

    expect(submitted).toBe(false)
  })

  test('form.setValues', () => {
    const { result } = renderHook(() => useForm<UserDTO>())
    const form = result.current

    const values: UserDTO = {
      age: 18,
      name: 'John',
    }

    act(() => {
      form.setValues(values)
    })

    expect(form.getValues()).toEqual(values)
  })

  test('form.setErrors, form.setWarns', () => {
    const { result } = renderHook(() => useForm<UserDTO>())
    const form = result.current

    act(() => {
      form.setErrors({ age: 'required' })
    })
    act(() => {
      form.setWarns({ name: 'empty' })
    })
    expect(form.fields.age.error).toBe('required')
    expect(form.fields.name.warn).toBe('empty')
  })
})

// TODO:
describe('Create factory', () => {
  test('Default transformers', async () => {
    const useForm = formFactory<{ result: string }>(() => {
      const hook = useMemo(() => 'hook', [])

      return {
        transformers: {
          error: v => `global-${v.result}-${hook}`,
        },
      }
    })

    const { result } = renderHook(() =>
      useForm<{ name: string }>({
        schema: {
          name: v => !v && { result: 'error' },
        },
      })
    )

    await act(async () => {
      await result.current.validate()
    })

    expect(result.current.fields.name.error).toBe('global-error-hook')
  })

  test('Override default transformers', async () => {
    const useForm = formFactory<{ result: string }>(() => {
      return {
        transformers: {
          error: v => `global-${v.result}`,
        },
      }
    })

    const { result } = renderHook(() =>
      useForm<{ name: string }>({
        schema: {
          name: v => !v && { result: 'error' },
        },
        transformers: {
          error: v => v.result,
        },
      })
    )

    await act(async () => {
      await result.current.validate()
    })

    expect(result.current.fields.name.error).toBe('error')
  })
})
