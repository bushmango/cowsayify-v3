import * as express from 'express'
import { json, urlencoded } from 'body-parser'
//import * as compression from 'compression';
import * as cors from 'cors'
import { eventContext } from 'aws-serverless-express/middleware'
import * as moment from 'moment'
const AWS = require('aws-sdk')

const COWS_TABLE = process.env.COWS_TABLE || 'cow-dev'

export function configureApp() {
  const app = express()
  //app.use(compression());
  app.use(cors())
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(eventContext())

  let dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1',
  })

  app.get('/', (req, res) => {
    res.send('Hello Cow World - Serverless API! - TS')
  })

  app.get('/test', (req, res) => {
    res.send('Test!')
  })

  app.get('/ping', (req, res) => {
    res.send('pong')
  })

  // Save cow
  app.post('/cows', function(req, res) {
    const { key, text, options } = req.body
    if (typeof key !== 'string') {
      res.status(400).json({ error: '"key" must be a string' })
    } else if (typeof text !== 'string') {
      res.status(400).json({ error: '"text" must be a string' })
    } else if (typeof options !== 'string') {
      res.status(400).json({ error: '"options" must be a string' })
    }

    let created = moment().format()
    let item = {
      key,
      text,
      options,
      created,
    }

    const params = {
      TableName: COWS_TABLE,
      Item: item,
    }

    dynamoDb.put(params, error => {
      if (error) {
        console.log(error)
        res.status(400).json({ error: 'Could not create cow' })
      }

      res.json(item)
    })
  })

  // Get cow
  app.get('/cows/:key', async (req, res) => {
    const params = {
      TableName: COWS_TABLE,
      Key: {
        key: req.params.key,
      },
    }

    // Async await
    try {
      let result = await dynamoDb.get(params).promise()
      if (result.Item) {
        const { key, text, options, created } = result.Item
        res.json({
          key,
          text,
          options,
          created,
        })
      } else {
        res.status(404).json({ error: 'Cow not found' })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not get cow' })
    }

    // Was
    // dynamoDb.get(params, (error, result) => {
    //   if (error) {
    //     console.log(error)
    //     res.status(400).json({ error: 'Could not get cow' })
    //   }
    //   if (result.Item) {
    //     const { key, text, options, created } = result.Item
    //     res.json({
    //       key,
    //       text,
    //       options,
    //       created,
    //     })
    //   } else {
    //     res.status(404).json({ error: 'Cow not found' })
    //   }
    // })
  })

  // List cows
  app.get('/cows-list', async (req, res) => {
    const params = {
      TableName: COWS_TABLE,
      ProjectionExpression: '#k, #t, options, created',
      ExpressionAttributeNames: { '#k': 'key', '#t': 'text' },
      // ExpressionAttributeValues: {
      //     ':s': { N: '2' },
      //     ':e': { N: '09' },
      //     ':topic': { S: 'PHRASE' },
      //   },
    }

    try {
      let data = await dynamoDb.scan(params).promise()
      res.json({ data })
    } catch (error) {
      console.log(error)
      res.status(400).json({ errorMessage: 'Could not list cows', error })
    }
  })

  return app
}
