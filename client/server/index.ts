// import { createServer } from 'http'
// import { parse } from 'url'
import * as express from 'express'
import * as next from 'next'

const port = parseInt(process.env.PORT, 10) || 3004
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

console.log(`> Starting Port: ${port} Dev: ${'' + dev}`)

app.prepare().then(() => {
  const server = express()

  server.get('/cowsaid/:key', (req, res) => {
    return app.render(req, res, '/cowsaid', { key: req.params.key })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
