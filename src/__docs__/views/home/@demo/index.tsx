import { css } from '@emotion/react'
import { useForm } from '@mc-petry/useform'
import { CButton } from '~/ui/button'
import { Container } from '~/ui/container'
import { CTextField } from '~/ui/forms/text-field'

interface User {
  name: string
  email: string
}

export function VHomeDemo() {
  const { fields, handleSubmit } = useForm<User>()

  return (
    <Container css={styles.demo}>
      <form onSubmit={handleSubmit(values => alert(JSON.stringify(values)))}>
        <CTextField field={fields.name} label="Name" />
        <CTextField field={fields.email} label="Email" />
        <CButton type="submit">{'Submit'}</CButton>
      </form>
    </Container>
  )
}

const styles = {
  demo: css`
    opacity: 1;
  `,
}
