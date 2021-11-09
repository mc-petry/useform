import { useForm } from '@mc-petry/useform'
import { IconReset } from '~/icons'
import { CButton } from '~/ui/button'
import { CForm } from '~/ui/forms/form'
import { CTextField } from '~/ui/forms/text-field'

interface User {
  name: string
  age: number
  email: string
}

export function VExamplesSimple() {
  const form = useForm<User>({
    fields: {
      name: {
        validate: value => (!value && 'Name is required') || (value!.length < 2 && 'Name too short'),
      },

      age: {
        validate: value => value == null && 'Age is required',
      },
    },
  })
  const { fields } = form

  return (
    <CForm form={form}>
      <CTextField field={fields.name} label={'Name'} />
      <CTextField field={fields.email} label={'Email'} />

      <CForm.Actions>
        <CButton type="submit" intent="primary">
          {'Submit'}
        </CButton>
        <CButton type="reset" icon="reset" disabled={!form.touched()}>
          <IconReset />
        </CButton>
      </CForm.Actions>
    </CForm>
  )
}
