const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const cfg = {
  optimizeImages: false,
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }

    config.resolve.alias.react = require.resolve("react")

    return config
  }
}

module.exports = withTypescript(cfg)
