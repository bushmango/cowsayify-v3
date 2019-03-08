import * as express from 'express'
import { MongoClient, Db } from 'mongodb'

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
  
  server.get('/mongo-api/v1/test/', (req, res) => {

    if(!db) { return res.end('merp') ;}
      
    const collection = db.collection('zips');
    // Find some documents
    collection.find({}).limit(100).toArray((err, docs) => {
      
      console.log("Found the following records");
      console.log(docs)
      // callback(docs);
      return res.send(docs)
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
