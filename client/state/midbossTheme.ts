import * as midboss from 'midboss'
const midbossKey = 'theme'
export { midbossKey }

import { _ } from '@lib/lodash'

export interface IStateTheme {
  isLoading: boolean
}

let initialState: IStateTheme = {
  isLoading: false,
}

const stateManager = midboss.createMidboss(midbossKey, '1.0.0', initialState, {
  useLocalStorage: false,
})
export { stateManager }

export function setLoading(isLoading: boolean) {
  stateManager.produce((draftState) => {
    draftState.isLoading = isLoading
  })
}
