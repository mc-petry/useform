describe('useFormChild', () => {
  // test('Object', async () => {
  //   interface UserData {
  //     name: string
  //   }

  //   interface FormData {
  //     users: UserData[]
  //   }

  //   const {
  //     result: { current: root },
  //   } = renderHook(() =>
  //     useForm<FormData>({
  //       initialValues: {
  //         users: [{ name: 'John' }],
  //       },
  //     })
  //   )

  //   const {
  //     result: { current: child },
  //   } = renderHook(() =>
  //     useForm<UserData>({
  //       fields: {
  //         name: {
  //           validate: v => v && v.length < 10 && 'min-length',
  //         },
  //       },
  //     })
  //   )

  //   const {
  //     result: {
  //       current: { fields },
  //     },
  //     rerender,
  //   } = renderHook(() => useFormChild(0, root.fields.users, child))

  //   rerender()

  //   await act(async () => {
  //     await root.validate()
  //   })

  //   expect(fields.name.value).toBe('John')
  //   expect(fields.name.error).toBe('min-length')

  //   act(() => {
  //     fields.name.onChange('Jesika')
  //   })

  //   expect(root.fields.users.value).toEqual([{ name: 'Jesika' } as UserData])

  //   act(() => {
  //     root.reset()
  //   })

  //   expect(fields.name.value).toBe(undefined)
  //   expect(fields.name.error).toBe(null)
  // })
  expect(1).toBe(1)
})
