import { css } from '@emotion/react'

interface Props {
  children: React.ReactNode
}

export function CBox({ children }: Props) {
  return <div css={styles.box}>{children}</div>
}

const styles = {
  box: css`
    /* background: #171319;
    border-radius: 24px;
    padding: 24px; */
  `,
}
