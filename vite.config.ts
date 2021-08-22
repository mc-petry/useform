import { css } from '@emotion/react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  plugins: [reactRefresh()],
  esbuild: {
    jsxFactory: `jsx`,
    jsxInject: `
      import React from 'react'
      import { jsx } from '@emotion/react'
    `,
  },
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['react', '@emotion/react'],
    },
  },
}))

const styles = {
  global: css`
    @import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;700&display=swap');
  `,
}
