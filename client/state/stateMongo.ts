import * as stateUtil from './stateUtil'
const stateKey = 'minimongo'
export { stateKey }

import { _ } from '../imports/lodash'
import fetch from 'isomorphic-unfetch'

const host = process.env.host

interface IStateMinimongo {
  fetchedTest: any,
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

export async function fetchTest() {
  const res = await fetch(host + '/cows-list')
  const fetchedHistory = await res.json()
  stateManager.produce(draftState => {
    draftState.fetchedTest = fetchedHistory
  })
}
