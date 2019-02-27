// next.config.js
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const useCssModules = true

module.exports = (phase, { defaultConfig }) => {
  let config = withTypescript(
    withSass({
      webpack(config, options) {
        // Do not run type checking twice:
        if (options.isServer) {
          config.plugins.push(new ForkTsCheckerWebpackPlugin())
        }

        if (!options.isServer) {
          // See: https://github.com/zeit/next.js/blob/master/examples/with-typings-for-css-modules/next.config.js
          // for (let entry of options.defaultLoaders.css) {
          //   if (entry.loader === 'css-loader') {
          //     entry.loader = 'typings-for-css-modules-loader'
          //     break
          //   }
          // }
          for (let entry of options.defaultLoaders.sass) {
            if (entry.loader === 'css-loader') {
              entry.loader = 'typings-for-css-modules-loader'
              break
            }
          }
        }

        for (let rule of config.module.rules) {
          if (rule.use) {
            if (typeof rule.use === 'object') {
              let useItem = rule.use
              if (useItem.loader === 'css-loader/locals') {
                useItem.loader = 'typings-for-css-modules-loader/locals'
              }
            } else {
              for (let useItem of rule.use) {
                if (useItem.loader === 'css-loader/locals') {
                  useItem.loader = 'typings-for-css-modules-loader/locals'
                }
              }
            }
          }
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
            : '[hash:base64]',
      },
    })
  )

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    config.env = {
      host: 'https://hd7idfu7th.execute-api.us-east-1.amazonaws.com/dev',
      // host: 'https://api.cowsayify.com/',
      // host: 'http://localhost:3005'
    }

    return config
  } else {
    config.target = 'serverless'

    config.env = {
      host: 'https://hd7idfu7th.execute-api.us-east-1.amazonaws.com/dev',
      // host: 'https://api.cowsayify.com/',
    }

    return config
  }
}
