import * as midboss from 'midboss'

import { _ } from '@lib/lodash'
import fetch from 'isomorphic-unfetch'

const host = process.env.host

export interface IStateHistory {
  fetchedHistory: {
    error?: string
    data?: {
      Items: {
        created: Date
        options: string
        text: string
      }[]
    }
  }
}

let initialState: IStateHistory = {
  fetchedHistory: null,
}

const stateManager = midboss.createMidboss('history', '1.0.0', initialState, {
  useLocalStorage: false,
})
export function useSubscribe() {
  return midboss.useSubscription(stateManager)
}
export function dehydrate(fromServer: boolean) {
  if (!fromServer) {
    return null
  }
  return stateManager.getState()
}
let isHydrated = false
export function rehydrate(state: Partial<IStateHistory>) {
  if (!isHydrated) {
    if (state) {
      stateManager.setState(state)
    }
    isHydrated = true
  }
}

export async function fetchHistory() {
  const res = await fetch(host + '/cows-list')
  const fetchedHistory = await res.json()
  stateManager.produce((draftState) => {
    draftState.fetchedHistory = fetchedHistory
  })
}
