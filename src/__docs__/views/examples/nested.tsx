import { Field, useFieldNested, useForm } from '@mc-petry/useform'
import { IconReset } from '~/icons'
import { CButton } from '~/ui/button'
import { CForm } from '~/ui/forms/form'
import { CTextField } from '~/ui/forms/text-field'

interface User {
  firstName?: string
  lastName?: string
}

interface Card {
  user: User
}

export function VExamplesNested() {
  const form = useForm<Card>({
    initialValues: {
      user: {
        firstName: 'Adeline',
      },
    },
  })
  const { fields } = form

  return (
    <CForm form={form}>
      <UserForm field={fields.user} />

      <CForm.Actions>
        <CButton type="submit" intent="primary">
          Submit
        </CButton>
        <CButton type="reset" icon="reset" disabled={!form.touched()}>
          <IconReset />
        </CButton>
      </CForm.Actions>
    </CForm>
  )
}

interface UserFormProps {
  field: Field<User>
}

function UserForm({ field }: UserFormProps) {
  const { fields } = useFieldNested(field)

  return (
    <>
      <CTextField field={fields.firstName} label={'First name'} />
      <CTextField field={fields.lastName} label={'Last name'} />
    </>
  )
}
