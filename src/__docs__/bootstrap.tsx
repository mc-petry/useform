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
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code&family=Overpass:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');

    html,
    body {
      margin: 0;
      font-family: 'Overpass';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      min-height: 100%;
      background: #2a2631;
    }

    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    ::-webkit-scrollbar-thumb {
      width: 2px;
      height: 2px;
      background: rgba(255, 255, 255, 0.2);
    }

    * {
      box-sizing: border-box;
      scrollbar-width: 2px;
    }
  `,
}
