// index.js

const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

//const USERS_TABLE = process.env.USERS_TABLE
const COWS_TABLE = process.env.COWS_TABLE

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

dynamoDb = new AWS.DynamoDB.DocumentClient()

app.use(bodyParser.json({ strict: false }))

app.get('/', function(req, res) {
  res.send('Hello Cow World!')
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

// // Get User endpoint
// app.get('/users/:userId', function(req, res) {
//   const params = {
//     TableName: USERS_TABLE,
//     Key: {
//       userId: req.params.userId,
//     },
//   }

//   dynamoDb.get(params, (error, result) => {
//     if (error) {
//       console.log(error)
//       res.status(400).json({ error: 'Could not get user' })
//     }
//     if (result.Item) {
//       const { userId, name } = result.Item
//       res.json({ userId, name })
//     } else {
//       res.status(404).json({ error: 'User not found' })
//     }
//   })
// })

// // Create User endpoint
// app.post('/users', function(req, res) {
//   const { userId, name } = req.body
//   if (typeof userId !== 'string') {
//     res.status(400).json({ error: '"userId" must be a string' })
//   } else if (typeof name !== 'string') {
//     res.status(400).json({ error: '"name" must be a string' })
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   }

//   dynamoDb.put(params, error => {
//     if (error) {
//       console.log(error)
//       res.status(400).json({ error: 'Could not create user' })
//     }
//     res.json({ userId, name })
//   })
// })

module.exports.handler = serverless(app)
