
// import { createServer } from 'http'
// import { parse } from 'url'
import * as express from 'express'
import * as cors from 'cors'
import * as mongoApi from './mongoApi'

const port = parseInt(process.env.PORT || '3008', 10) || 3008
const dev = process.env.NODE_ENV !== 'production'


import { json, urlencoded } from 'body-parser'

const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

mongoApi.attach(app)

app.listen(port, (err) => {
    if (err) throw err
    console.log(`Example app listening on port ${port}!`)
})

