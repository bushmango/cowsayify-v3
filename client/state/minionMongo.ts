import * as midboss from 'midboss'
const midbossKey = 'mongo'
export { midbossKey }

import minimongo from 'minimongo'

import { _ } from '../imports/lodash'
import fetch from 'isomorphic-unfetch'

const host = process.env.host

interface IStateMongo {
  search: string
  fetchedMongo: any
  fetchedMinimongo: any
  isLoading: boolean
}

let initialState: IStateMongo = {
  search: '917',
  fetchedMongo: null,
  fetchedMinimongo: null,
  isLoading: true,
}

const stateManager = midboss.createMidboss(midbossKey, '1.0.0', initialState, {
  useLocalStorage: false,
})
export { stateManager }

let mongoUrl = 'http://localhost:3008/mongo-api/v1/'

export async function fetchMongo() {
  let search = ''
  stateManager.produce((draftState) => {
    draftState.isLoading = true
    search = draftState.search
  })

  let data = await fetch(mongoUrl + `test/${search || '-'}`)
  let json = await data.json()

  stateManager.produce((draftState) => {
    draftState.fetchedMongo = json
    draftState.isLoading = false
  })
}

let minimongoUrl = 'http://localhost:3008/minimongo-api/v1/'

export async function fetchMinimongo() {
  let db = new minimongo.RemoteDb(minimongoUrl, 'myclientid123')

  let search = ''
  stateManager.produce((draftState) => {
    draftState.isLoading = true
    search = draftState.search
  })

  db.addCollection('zips')
  let find = db.zips.find(
    { zip: { $regex: _.escapeRegExp(search) } },
    { limit: 10 }
  )
  find.fetch((res) => {
    stateManager.produce((draftState) => {
      draftState.fetchedMinimongo = res
      draftState.isLoading = false
    })
  })
}

export async function getTotalPop() {
  let data = await fetch(
    `http://localhost:3008/minimongo-api/get-total-population`
  )
  let json = await data.json()
  return json.total
}
