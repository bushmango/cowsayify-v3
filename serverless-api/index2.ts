const serverless = require('serverless-http')
const bodyParser = require('body-parser')
// const express = require('express')
import * as express from 'express'
const app = express()
const cors = require('cors')
const AWS = require('aws-sdk')

//const USERS_TABLE = process.env.USERS_TABLE
const COWS_TABLE = process.env.COWS_TABLE || 'cow-dev'

// const IS_OFFLINE = process.env.IS_OFFLINE
// let dynamoDb
// if (IS_OFFLINE === 'true') {
//   dynamoDb = new AWS.DynamoDB.DocumentClient({
//     region: 'localhost',
//     endpoint: 'http://localhost:8000',
//   })
//   console.log(dynamoDb)
// } else {
//   dynamoDb = new AWS.DynamoDB.DocumentClient()
// }

let dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
})

app.use(cors())
app.use(bodyParser.json({ strict: false }))

app.get('/', (req, res) => {
  res.send('Hello Cow World - Serverless API!')
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

  const params = {
    TableName: COWS_TABLE,
    Item: {
      key: key,
      text: text,
      options: options,
    },
  }

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not create cow' })
    }
    res.json({
      key: key,
      text: text,
      options: options,
    })
  })
})

// Get cow
app.get('/cows/:key', function(req, res) {
  const params = {
    TableName: COWS_TABLE,
    Key: {
      key: req.params.key,
    },
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not get cow' })
    }
    if (result.Item) {
      const { key, text, options } = result.Item
      res.json({
        key: key,
        text: text,
        options: options,
      })
    } else {
      res.status(404).json({ error: 'Cow not found' })
    }
  })
})

// List cows
app.get('/cows-list', function(req, res) {
  const params = {
    TableName: COWS_TABLE,
    ProjectionExpression: '#k, #t, options',
    ExpressionAttributeNames: { '#k': 'Key', '#t': 'Text' },
    // ExpressionAttributeValues: {
    //     ':s': { N: '2' },
    //     ':e': { N: '09' },
    //     ':topic': { S: 'PHRASE' },
    //   },
  }

  dynamoDb.scan(params, (error, data) => {
    if (error) {
      console.log(error)
      res.status(400).json({ errorMessage: 'Could not list cows', error })
    } else {
      //console.log("Success", data.Items);
      // data.Items.forEach(function(element, index, array) {
      //   console.log(element.Title.S + ' (' + element.Subtitle.S + ')')
      // })
      res.json({ data })
    }
  })
})

const handler = serverless(app)
export default handler
export { app, handler }
module.exports.handler = serverless(app)
