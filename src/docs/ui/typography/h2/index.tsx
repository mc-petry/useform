import { css } from '@emotion/react'

const style = css`
  font-size: 28px;
  font-weight: bold;
  color: #555;
  padding: 1em 0 0;
  margin: 0 0 .5em;
`

export function H2({ children, ...rest }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return <h2 css={style} {...rest}>{children}</h2>
}
