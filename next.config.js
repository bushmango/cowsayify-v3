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

        if (!options.isServer) {
          console.log('default loaders 2')
          console.log(JSON.stringify(options.defaultLoaders.sass, null, 2))
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
          console.log('default loaders 3')
          console.log(JSON.stringify(options.defaultLoaders.sass, null, 2))
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

        console.log('config')
        console.log(JSON.stringify(config.module.rules, null, 2))
        return config
      },
      cssModules: true,
      cssLoaderOptions: {
        camelCase: true,
        namedExport: true,
      },
    })
  )

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return config
  } else {
    config.target = 'serverless'
    return config
  }
}
