import { Field } from '@mc-petry/useform'
import styles from './styles'

interface Props {
  field: Field
}

export function FieldMessage({ field }: Props) {
  if (!field.error && !field.warn) {
    return null
  }

  return <div
    css={[
      styles.message,
      field.error && styles.error || field.warn && styles.warn
    ]}
  >
    {field.error || field.warn}
  </div>
}
