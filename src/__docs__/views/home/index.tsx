import { css } from '@emotion/react'
import { Field, useForm } from '../../..'
import { useFormChild } from '../../../use-form-child'
import { Button } from '../../ui/button'
import { TextField } from '../../ui/forms/text-field'

interface Address {
  city: string
  lane: string
}

export function VHome() {
  const { fields, handleSubmit, reset, getValues } = useForm<{
    firstName: string
    lastName: string
    address: Address[]
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
        },
      ],
    },
  })

  return (
    <div>
      <div css={styles.intro}>Create strongly typed forms in a simplest way</div>
      <div css={styles.content}>
        <form onSubmit={handleSubmit(values => alert(JSON.stringify(values)))} onReset={() => reset()}>
          <TextField field={fields.firstName} label="First Name" />
          <TextField field={fields.lastName} label="Last Name" />
          Home address:
          {JSON.stringify(fields.address.value)}
          {fields.address.value!.map((x, i) => (
            <SubForm key={i} index={i} field={fields.address} />
          ))}
          <Button type="submit">{'Submit'}</Button>
          <Button type="reset">{'reset'}</Button>
        </form>
      </div>
      {JSON.stringify(getValues())}
    </div>
  )
}

const styles = {
  intro: css`
    max-width: 600px;
    padding: 100px 0;
    margin: 0 auto;
    color: #fff;
    font-size: 48px;
    text-align: center;
  `,

  content: css`
    color: #eee;
    max-width: 1000px;
    margin: 0 auto;
  `,
}

function SubForm({ index, field }: { index: number; field: Field<Address[]> }) {
  console.log(field.value![0])
  const { fields } = useFormChild(index, field, {
    fields: {
      city: {
        validateOnChange: true,
      },
    },
    validationSchema: {
      city: v => !v && 'required',
      lane: v => !v && 'required',
    },
  })

  console.log('[ subform ] render')

  return (
    <div>
      Nested [ {index} ]:
      <TextField label={'City'} field={fields.city} />
      <TextField label={'Lane'} field={fields.lane} />
    </div>
  )
}
