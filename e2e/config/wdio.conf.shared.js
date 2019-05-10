const baseUrl = 'https://webdriver.io'

let generateConfig = (isHeadless) => {
  let chromeOptionsArgs = []
  let maxInstances = 1
  let useScreenshots = false
  if (isHeadless) {
    // to run chrome headless the following flags are required
    // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
    chromeOptionsArgs = ['--headless', '--disable-gpu']
    maxInstances = 5
  }

  return {
    runner: 'local',
    specs: ['./test/**/*.e2e.ts'],
    maxInstances: 10,
    capabilities: [
      {
        maxInstances: maxInstances,
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: chromeOptionsArgs
        }
      }
    ],
    logLevel: 'error',
    deprecationWarnings: true,
    bail: 0,
    baseUrl: baseUrl,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'mocha',
    reporters: ['spec', 'allure'],
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000,
      compilers: ['ts-node/register', 'tsconfig-paths/register']
    },

    before: function (capabilities, specs) {
      require('ts-node/register')
    },

    beforeTest: function (test) {
      console.log('=== Running', test.parent, '->', test.title)
    },

    afterTest: function (test) {
      if (useScreenshots) {
        if (test.error !== undefined) {
          let name = 'ERROR-' + Date.now()
          console.log('saving screenshot ', name)
          browser.saveScreenshot('./errorShots/' + name + '.png')
        }
      }
    },
    screenshotPath: './errorShots/'
  }
}

exports.generateConfig = generateConfig
