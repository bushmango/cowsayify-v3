import * as stateUtil from './stateUtil'
const stateKey = 'minimongo'
export { stateKey }

import { _ } from '../imports/lodash'
import fetch from 'isomorphic-unfetch'

const host = process.env.host

interface IStateMinimongo {
  fetchedTest: any
}

let initialState: IStateMinimongo = {
  fetchedTest: null,
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
  let data = await fetch(mongoUrl + 'test')
  let json = await data.json()

  stateManager.produce(draftState => {
    draftState.fetchedTest = json
  })
}
