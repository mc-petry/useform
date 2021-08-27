import { ReactNode } from 'react'
import styles from './styles'

export function LayoutContainer({ children, ...css }: { children: ReactNode }) {
  return <div css={styles.container} {...css}>
    {children}
  </div>
}
