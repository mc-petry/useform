import { Global } from '@emotion/react'
import { ReactNode } from 'react'
import { LayoutFooter } from './footer'
import styles from './styles'

export function Layout({ children }: { children: ReactNode }) {
  return <div css={styles.layout}>
    <Global styles={styles.global} />
    {children}
    <LayoutFooter />
  </div>
}
