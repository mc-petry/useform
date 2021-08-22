import { css } from '@emotion/react'
import { Field, useForm } from '../../..'
import { useFormChild } from '../../../use-form-child'
import { TextField } from '../../ui/forms/text-field'

interface Address {
  city: string
  lane: string
}

export function VHome() {
  const { fields, getValues } = useForm<{ firstName: string; lastName: string; address: Address[] }>({
    validationSchema: {
      address: v => (!v && 'required') || (v.length < 5 && 'min length'),
    },
    initialValues: {
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
        <TextField field={fields.firstName} label="First Name" />
        <TextField field={fields.lastName} label="Last Name" />
        Home address:
        {fields.address.value!.map((x, i) => (
          <SubForm key={i} index={i} field={fields.address} />
        ))}
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
    max-width: 1000px;
    margin: 0 auto;
  `,
}

function SubForm({ index, field }: { index: number; field: Field<Address[]> }) {
  const { fields } = useFormChild(index, field, {
    validationSchema: {
      lane: v => !v && 'required',
    },
  })

  console.log('render')

  return (
    <div>
      Nested [ {index} ]:
      <TextField label={'City'} field={fields.city} />
      <TextField label={'Lane'} field={fields.lane} />
    </div>
  )
}
