import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import { BuildOptions, defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  let build: BuildOptions

  switch (mode) {
    case 'production':
      build = {
        lib: {
          entry: './src/index.ts',
          formats: ['cjs', 'es'],
        },
        rollupOptions: {
          external: ['react', '@emotion/react'],
        },
      }
      break

    case 'server':
      build = {
        outDir: './dist/server',
      }
      break

    case 'site':
      build = {
        outDir: './docs',
      }
      break
  }

  return {
    plugins: [reactRefresh()],
    esbuild: {
      jsxFactory: `jsx`,
      jsxInject: mode !== 'production' && `import React from 'react';import { jsx } from '@emotion/react';`,
    },
    build,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src/__docs__'),
        '@mc-petry/useform': path.resolve(__dirname, './src'),
      },
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },
  }
})
