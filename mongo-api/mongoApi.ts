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
    console.log(JSON.stringify({zip: {$regex: _.escapeRegExp(search) }}))
    collection.find({zip: {$regex: _.escapeRegExp(search) }}).limit(10).toArray((err, docs) => {
      
      // console.log("Found the following records");
      // console.log(docs)
      // callback(docs);
      return res.json(docs)
    })  
  })

  server.get('/minimongo-api/get-total-population', async (req: express.Request, res) => {
    const dbCollection = db.collection('zips');
    let total = 0
    await dbCollection.find().forEach((zip) => {
      total += zip.pop
    })
    res.send({total})
  })

  server.get('/minimongo-api/v1/:collection', (req: express.Request, res) => {

    let { collection } = req.params 
    let { limit, client, selector } = req.query 
    console.log('start request')

    if(_.isString(limit)) {
      limit = _.toInteger(limit)
    }

    if(!limit || limit > 100) {
      limit = 100
    }

    console.log(collection, limit, client, selector)
    console.log(JSON.stringify(selector))
    if(!db) { res.end('merp'); return}
      
    const dbCollection = db.collection(collection);
    // Find some documents
    console.log('start find')
    dbCollection.find(JSON.parse(selector)).limit(limit).toArray((err, docs) => {
      
      // console.log("Found the following records");
      // console.log(docs)
      // callback(docs);


      console.log(docs)

      return res.json(docs)
    })  
    

    //return res.send('get request')
  })
  server.post('/minimongo-api/v1/post/:collection', (req, res) => {
    return res.send('post request')
  })
  server.patch('/minimongo-api/v1/patch/:collection', (req, res) => {
    return res.send('patch request')
  })
}
