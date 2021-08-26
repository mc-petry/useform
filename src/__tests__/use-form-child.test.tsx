import { act, renderHook } from '@testing-library/react-hooks'
import { useFormChild } from '..'

describe('Children forms', () => {
  test('Object', async () => {
    interface UserData {
      name: string
    }

    interface FormData {
      users: UserData[]
    }

    const {
      result: { current: parent },
    } = renderHook(() =>
      useForm<FormData>({
        initialValues: {
          users: [{ name: 'John' }],
        },
      })
    )

    const {
      result: { current: child },
    } = renderHook(() =>
      useForm<UserData>({
        fields: {
          name: {
            validate: v => v && v.length < 10 && 'min-length',
          },
        },
      })
    )

    const {
      result: { current: proxy },
      rerender,
    } = renderHook(() => useFormChild(0, parent.fields.users, child))

    rerender()

    await act(async () => {
      await parent.validate()
    })

    expect(proxy.fields.name.value).toBe('John')
    expect(proxy.fields.name.error).toBe('min-length')

    act(() => {
      proxy.fields.name.onChange('Jesika')
    })

    expect(parent.fields.users.value).toEqual([{ name: 'Jesika' } as UserData])

    act(() => {
      parent.reset()
    })

    expect(proxy.fields.name.value).toBe(undefined)
    expect(proxy.fields.name.error).toBe(null)
  })
})
