import { ReactElement } from 'react'
import styles from './styles'

interface Props {
  children: ReactElement[]
}

export function Split({ children, ...rest }: Props) {
  return <div css={styles.split} {...rest}>
    {children}
  </div>
}
