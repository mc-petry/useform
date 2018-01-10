import * as path from 'path'
import * as webpack from 'webpack'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'

const outputDir = path.join(__dirname, 'dist')

const config: webpack.Configuration = {
  entry: {
    index: './src'
  },

  output: {
    path: outputDir,
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declaration: true,
                declarationDir: '../dist'
              },
              onlyCompileBundledFiles: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([
      'dist'
    ])
  ]
}

export default config