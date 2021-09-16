import { css, Global, ThemeProvider } from '@emotion/react'
import { StrictMode } from 'react'
import { defaultTheme } from './theme'
import { Views } from './views'

export function Bootstrap() {
  return (
    <StrictMode>
      <ThemeProvider theme={defaultTheme}>
        <Global styles={styles.global} />
        <Views />
      </ThemeProvider>
    </StrictMode>
  )
}

const styles = {
  global: css`
    @import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;700&display=swap');

    html,
    body {
      margin: 0;
      font-family: 'Overpass';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      min-height: 100%;
      background: #2a2631;
    }

    * {
      box-sizing: border-box;
    }
  `,
}
