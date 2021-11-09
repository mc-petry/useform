import { css } from '@emotion/react'

interface Props {
  children: React.ReactNode
}

export function TQuote({ children }: Props) {
  return <span css={styles.quote}>{children}</span>
}

const styles = {
  quote: css`
    color: #dac3ff;

    &::before,
    &::after {
      content: '\`';
      color: #a694c4;
    }
  `,
}
