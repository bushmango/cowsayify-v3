// import { createServer } from 'http'
// import { parse } from 'url'
import * as express from 'express'
import * as next from 'next'
import * as _ from 'lodash'

const port = parseInt(process.env.PORT, 10) || 3006
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

console.log(`> Starting Port: ${port} Dev: ${'' + dev}`)

import { routes } from '../routes'

import * as fs from 'fs'
import * as path from 'path'

function createNowRoutes() {
  // Write now.json

  let baseJson: any = {
    version: 2,
    name: 'cowsayify-v3',
    builds: [{ src: 'package.json', use: '@now/next' }],
    //routes: [{ src: '/cowsaid/(?<key>[^/]+)$', dest: '/cowsaid?key=$key' }],
  }

  let nowRoutes = []

  _.forEach(routes, (c) => {
    let route = {
      src: '',
      dest: '',
    }
    nowRoutes.push(route)

    let src = c.base
    let dest = c.base
    _.forEach(c.params, (d, dIdx) => {
      src += `/(?<${d}>[^/]+)`
      if (dIdx > 0) {
        dest += '&'
      } else {
        dest += '?'
      }
      dest += `${d}=$${d}`
    })
    route.src = src
    route.dest = dest
    console.log('+', src, dest)
  })

  baseJson.routes = nowRoutes

  fs.writeFile(
    path.join(__dirname, '../now.json'),
    JSON.stringify(baseJson, null, 2),
    (err) => {
      if (err) {
        console.log('err')
      }
      console.log('wrote now.json')
    }
  )
}

app.prepare().then(() => {
  const server = express()

  _.forEach(routes, (c) => {
    let url = c.base
    _.forEach(c.params, (d) => {
      url += '/:' + d
    })
    console.log('+', url)
    server.get(url, (req, res) => {
      let params = {}
      _.forEach(c.params, (d) => {
        params[d] = req.params[d]
      })
      return app.render(req, res, c.base, params)
    })
  })

  // server.get('/tools/pokemon-details/:key', (req, res) => {
  //   console.log('key:', req.params.key)
  //   return app.render(req, res, '/tools/pokemon-details', {
  //     key: req.params.key,
  //   })
  // })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  createNowRoutes()

  console.log('> Listening...')
  server.listen(port, (err) => {
    if (err) {
      console.log('> Error listening on port ' + port)
      throw err
    }
    console.log(`> Ready on http://localhost:${port}`)
  })
})
