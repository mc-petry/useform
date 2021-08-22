import { css } from '@emotion/react'
import { ReactNode } from 'react'

const style = css`
  font-size: 18px;
  color: #555;
  margin: 2em 0 1em;
`

export function H4({ children, ...rest }: { children: ReactNode }) {
  return <h4 css={style} {...rest}>{children}</h4>
}
