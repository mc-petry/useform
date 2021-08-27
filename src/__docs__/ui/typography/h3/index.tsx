import { css } from '@emotion/react'
import { ReactNode } from 'react'

const style = css`
  color: #555;
  font-size: 20px;
  border-bottom: 1px solid #e1e1e1;
  padding: 24px 0 8px;
  margin: 0 0 32px;
`

export function H3({ children, ...rest }: { id?: string, children: ReactNode }) {
  return <h3 css={style} {...rest}>{children}</h3>
}
