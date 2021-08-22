import { css } from '@emotion/react'

export default {
  global: css`
    /* @import url('https://fonts.googleapis.com/css?family=Fira+Sans:300|400&display=swap&subset=cyrillic'); */
    @import url('https://fonts.googleapis.com/css?family=Fira+Sans+Condensed|Fira+Sans:300,400&display=swap');

    *, :after, :before {
      box-sizing: border-box;
    }

    html, body, #__next {
      width: 100%;
      height: 100%;
    }

    body {
      margin: 0;
      font-size: 12px;
      background: #f9fbfc;
    }

    body,
    input {
      font-family: 'Fira Sans', 'Roboto', 'Segoe UI', sans-serif;
    }
  `,

  layout: css`
    height: 100%;
  `
}
