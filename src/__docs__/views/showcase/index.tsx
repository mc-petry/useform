import { css } from '@emotion/react'
import { Field, useFieldArray, useFieldNested, useForm } from '@mc-petry/useform'
import { CButton } from '~/ui/button'
import { Container } from '~/ui/container'
import { CForm } from '~/ui/forms/form'
import { CTextField } from '~/ui/forms/text-field'
import { TH2 } from '~/ui/typography/h2'

interface Account {
  email: string
  password: string
  password2: string
}

interface Contact {
  address: string
  city: string
  phone: string[]
}

interface User {
  firstName: string
  lastName: string

  account: Account
  contact: Contact[]
}

export function VShowcase() {
  const form = useForm<User>({
    initialValues: {
      account: {} as Account,
      contact: [
        {
          address: '',
          city: '',
          phone: [],
        },
      ],
    },
    validationSchema: {
      firstName: v => !v && 'First name required',
      lastName: v => !v && 'Last name required',
    },
  })

  const { fields } = form

  return (
    <Container css={styles.showcase}>
      <CForm form={form}>
        <CTextField field={fields.firstName} label={'First name'} />
        <CTextField field={fields.lastName} label={'Last name'} />

        <TH2>Account information</TH2>
        <AccountForm field={fields.account} />

        <TH2>Contact information</TH2>

        {fields.contact.value!.map((x, i) => (
          <ContactForm key={i} field={fields.contact} index={i} />
        ))}

        <CForm.Actions>
          <CButton type="submit" intent="primary">
            {'Submit'}
          </CButton>
          <CButton type="reset" icon="reset" disabled={!form.touched()}>
            {'Reset'}
          </CButton>
        </CForm.Actions>
      </CForm>
    </Container>
  )
}

interface AccountFormProps {
  field: Field<Account>
}

function AccountForm({ field }: AccountFormProps) {
  const { fields } = useFieldNested(field, {
    fields: {
      password: {
        dependent: 'password2',
      },
    },
    validationSchema: {
      email: v => !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(v) && 'Invalid email address',
      password: [
        v => !v || (v.length < 8 && 'Password too short'),
        v => v.search(/[!@#$%^&*]/) < 0 && 'Password must contain at least one special character',
      ],
      password2: (v, { password }) => v !== password.value && 'Passwords should match',
    },
  })

  return (
    <>
      <CTextField field={fields.email} label={'Email'} />
      <CTextField field={fields.password} label={'Password'} />
      <CTextField field={fields.password2} label={'Repeat password'} />
    </>
  )
}

interface ContactFormProps {
  field: Field<Contact[]>
  index: number
}

function ContactForm({ field, index }: ContactFormProps) {
  const { fields } = useFieldArray(field, index, {
    validationSchema: {
      address: [],
    },
  })

  return (
    <>
      <CTextField field={fields.address} label={'Address'} />
    </>
  )
}

const styles = {
  showcase: css`
    padding-top: 48px;
    padding-bottom: 48px;
    color: #ccc;
  `,
}
