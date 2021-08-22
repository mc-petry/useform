import { ReactNode } from 'react'
import styles from './styles'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  children?: ReactNode
  onClick?: () => void
}

export function Button({ type = 'button', ...rest }: Props) {
  return <button
    {...rest}
    css={styles.btn}
    type={type}
  />
}
