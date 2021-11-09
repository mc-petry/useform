import { css } from '@emotion/react'

interface Props {
  children: React.ReactNode
}

export function TText({ children }: Props) {
  return <p css={styles.text}>{children}</p>
}

const styles = {
  text: css`
    margin: 1em 0;
    line-height: 1.6;
  `,
}
