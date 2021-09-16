import { css } from '@emotion/react'

export const defaultTheme = {
  container: css`
    width: 920px;
    margin-left: auto;
    margin-right: auto;
  `,
}

type DefaultTheme = typeof defaultTheme

declare module '@emotion/react' {
  export interface Theme extends DefaultTheme {}
}
