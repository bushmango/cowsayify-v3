import * as midboss from 'midboss'
const midbossKey = 'theme'
export { midbossKey }

import { _ } from '../imports/lodash'

export interface IStateTheme {
  isLoading: boolean
}

let initialState: IStateTheme = {
  isLoading: true,
}

const stateManager = midboss.createMidboss(midbossKey, '1.0.0', initialState, {
  useLocalStorage: true,
  useVerbose: true,
})
export { stateManager }

export function setLoading(isLoading: boolean) {
  stateManager.produce(draftState => {
    draftState.isLoading = isLoading
  })
  console.log('set loading to', isLoading)
}
