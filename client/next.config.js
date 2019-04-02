// next.config.js
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const useCssModules = true

const isProd = process.env.NODE_ENV === 'production'

module.exports = (phase, { defaultConfig }) => {
  let config = withTypescript(
    withSass({
      webpack (config, options) {
        // Do not run type checking twice:
        if (options.isServer) {
          config.plugins.push(new ForkTsCheckerWebpackPlugin())
        }
        return config
      },
      cssModules: useCssModules,
      cssLoaderOptions: {
        camelCase: true,
        namedExport: true,
        importLoaders: 1,
        localIdentName:
          phase === PHASE_DEVELOPMENT_SERVER
            ? '[name]_[local]_[hash:base64:5]'
            : '[hash:base64]'
      }
    })
  )

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    config.env = {
      // host: 'https://hd7idfu7th.execute-api.us-east-1.amazonaws.com/dev',
      host: 'https://api.cowsayify.com'
      // host: 'http://localhost:3005'
    }

    return config
  } else {
    config.target = 'serverless'

    config.env = {
      // host: 'https://hd7idfu7th.execute-api.us-east-1.amazonaws.com/dev',
      host: 'https://api.cowsayify.com'
    }

    config.assetPrefix = `https://s3.amazonaws.com/serverless-cowsay-3-prod002`
    if (isProd) {
      config.assetPrefix = `https://s3.amazonaws.com/serverless-cowsay-3-prod002`
    }

    return config
  }
}
