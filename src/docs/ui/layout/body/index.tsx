import { ReactNode } from 'react'
import { LayoutContainer } from '../container'
import styles from './styles'

interface Props {
  sidebar: ReactNode
  children: ReactNode
}

export function LayoutBody({ sidebar, children }: Props) {
  return <LayoutContainer css={styles.wrapper}>
    <div css={styles.children}>{children}</div>
    <div css={styles.sidebar}>{sidebar}</div>
  </LayoutContainer>
}
