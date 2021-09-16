import { useForm } from '@mc-petry/useform'

export function VHomeDemo() {
  const { fields, handleSubmit, reset, getValues } = useForm<{
    firstName: string
    lastName: string
    address: Address[]
    info: {
      nickname: string
      user?: string
    }
  }>({
    fields: {
      firstName: {
        validateOnChange: true,
        validateOnBlur: false,
      },
    },
    validationSchema: {
      firstName: v => !v && 'required',
    },
    initialValues: {
      firstName: 'John',
      address: [
        {
          city: 'Kharkiv',
          lane: '',
          phone: [
            {
              phone: '',
            },
            {
              phone: '+380664449992',
            },
          ],
        },
      ],
      info: {
        nickname: 'test',
      },
    },
  })

  const { fields: info } = useFormNested(fields.info, {
    fields: {
      nickname: {
        validate: v => !v && 'required',
      },
    },
    validationSchema: {
      user: v => !v && 'user',
    },
  })

  return (
    <div>
      <div css={styles.intro}>Create strongly typed forms in the easiest way</div>
      <div css={styles.content}>
        <form onSubmit={handleSubmit(values => alert(JSON.stringify(values)))} onReset={() => reset()}>
          {/* <TextField field={fields.firstName} label="First Name" />
          <TextField field={fields.lastName} label="Last Name" />
          Home address:
          {JSON.stringify(fields.address.value)}
          {fields.address.value!.map((x, i) => (
            <SubForm key={i} index={i} field={fields.address} />
          ))} */}
          Nested:
          <TextField field={info.nickname} label="Info nickname" />
          <TextField field={info.user} label="Info user" />
          <Button type="submit">{'Submit'}</Button>
          <Button type="reset">{'reset'}</Button>
        </form>
      </div>
      {JSON.stringify(getValues())}
    </div>
  )
}
