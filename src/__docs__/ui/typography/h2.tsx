import { css } from '@emotion/react'

interface Props {
  children: React.ReactNode
}

export function TH2({ children }: Props) {
  return <h2 css={styles.h2}>{children}</h2>
}

const styles = {
  h2: css`
    margin: 1.5em 0 1em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  `,
}
