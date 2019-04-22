import * as midboss from 'midboss'
import { _ } from '@lib/lodash'

export interface IStateTheme {
  isLoading: boolean
}

let initialState: IStateTheme = {
  isLoading: false,
}

const stateManager = midboss.createMidboss('theme', '1.0.0', initialState, {
  useLocalStorage: false,
})
export function useSubscribe() {
  return midboss.useSubscription(stateManager)
}

export function setLoading(isLoading: boolean) {
  stateManager.produce((draftState) => {
    draftState.isLoading = isLoading
  })
}
