import * as stateUtil from './stateUtil'
const stateKey = 'mongo'
export { stateKey }

import { _ } from '../imports/lodash'
import fetch from 'isomorphic-unfetch'

const host = process.env.host

interface IStateMongo {
  search: string
  fetchedTest: any
  isLoading: boolean
}

let initialState: IStateMongo = {
  search: '917',
  fetchedTest: null,
  isLoading: true,
}

const stateManager = stateUtil.createStateManager(
  stateKey,
  '1.0.0',
  initialState,
  {
    useLocalStorage: false,
  }
)
export { stateManager }

let mongoUrl = 'http://localhost:3008/mongo-api/v1/'

export async function fetchTest() {
  let search = ''
  stateManager.produce(draftState => {
    draftState.isLoading = true
    search = draftState.search
  })

  let data = await fetch(mongoUrl + `test/${search || '-'}`)
  let json = await data.json()

  stateManager.produce(draftState => {
    draftState.fetchedTest = json
    draftState.isLoading = false
  })
}
