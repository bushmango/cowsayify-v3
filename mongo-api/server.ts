
// import { createServer } from 'http'
// import { parse } from 'url'
import * as express from 'express'

import * as mongoApi from './mongoApi'

const port = parseInt(process.env.PORT || '3006', 10) || 3006
const dev = process.env.NODE_ENV !== 'production'

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

mongoApi.attach(app)

app.listen(port, (err) => {
    if (err) throw err
    console.log(`Example app listening on port ${port}!`)
})

