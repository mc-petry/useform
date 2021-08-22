import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'

export default [
  defineConfig({
    input: 'src/index.ts',
    plugins: [dts()],
    output: {
      file: `dist/useform.d.ts`,
      format: 'es',
    },
  }),
]
