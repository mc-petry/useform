import { css } from '@emotion/react'
import { ReactNode } from 'react'
import { mq } from '~/theme'

interface Props {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: Props) {
  return (
    <div css={styles.container} className={className}>
      {children}
    </div>
  )
}

const styles = {
  container: css`
    max-width: 920px;
    margin: 0 auto;
    padding: 0 16px;
    color: #eee;

    ${mq.phone} {
      padding-left: 24px;
      padding-right: 24px;
    }
  `,
}
