// next.config.js
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  let config = withTypescript(
    withSass({
      webpack(config, options) {
        // Do not run type checking twice:
        if (options.isServer) {
          config.plugins.push(new ForkTsCheckerWebpackPlugin())
        }
        return config
      },
      cssModules: true,
    })
  )

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return config
  } else {
    config.target = 'serverless'
    return config
  }
}
