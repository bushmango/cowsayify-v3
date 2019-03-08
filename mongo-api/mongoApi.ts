import * as express from 'express'
import { MongoClient, Db } from 'mongodb'
import * as _ from 'lodash'

// Connection URL
const url = 'mongodb://localhost:44444'

// Database Name
const dbName = 'tms2'

// Use connect method to connect to the server
let db: Db 
MongoClient.connect(url, (err, client) => {

  console.log('Connected successfully to server')
  db = client.db(dbName)

  // client.close()
})



export function attach(server: express.Express) {
  
  server.get('/mongo-api/v1/test/:search', (req, res) => {
    let { search } = req.params || ''
    console.log('start request')

    if(!db) { res.end('merp'); return}
      
    const collection = db.collection('zips');
    // Find some documents
    console.log('start find')
    collection.find({zip: {$regex: _.escapeRegExp(search) }}).limit(5).toArray((err, docs) => {
      
      console.log("Found the following records");
      console.log(docs)
      // callback(docs);
      return res.json(docs)
    })  
  })

  server.get('/mongo-api/v1/get/:collection', (req, res) => {
    return res.send('get request')
  })
  server.post('/mongo-api/v1/post/:collection', (req, res) => {
    return res.send('post request')
  })
  server.patch('/mongo-api/v1/patch/:collection', (req, res) => {
    return res.send('patch request')
  })
}
