import { css } from '@emotion/react'
import { ReactNode } from 'react'

const style = css`
  p {
    font-size: 16px;
    color: #555;
    line-height: 1.5;
    margin: 1em 0;
  }
`

export function Text({ children, ...rest }: { children: ReactNode }) {
  return <div css={style} {...rest}>
    {children}
  </div>
}
