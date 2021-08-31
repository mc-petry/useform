import { css } from '@emotion/react'
import { Field, useForm } from '../../..'
import { useFormChild } from '../../../use-form-child'
import { Button } from '../../ui/button'
import { TextField } from '../../ui/forms/text-field'

interface DeepObject {
  phone: string
}

interface Address {
  city: string
  lane: string
  phone: DeepObject[]
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

  return (
    <div>
      Nested [ {index} ]:
      <TextField label={'City'} field={fields.city} />
      <TextField label={'Lane'} field={fields.lane} />
      Phones:
      {fields.phone.value!.map((x, i) => (
        <DeepSubform key={i} index={i} field={fields.phone} />
      ))}
    </div>
  )
}

function DeepSubform({ index, field }: { index: number; field: Field<DeepObject[]> }) {
  const { fields } = useFormChild(index, field, {
    validationSchema: {
      phone: v => v !== '000' && 'Not 000',
    },
  })

  return (
    <div>
      Deep nested [ {index} ]:
      <TextField label={'City'} field={fields.phone} />
    </div>
  )
}
