import * as React from 'react'
const { useState, useEffect } = React
import * as PubSub from 'pubsub-js'
import { _ } from '../imports/lodash'

let verbose = false
let freeze = true
let clone = false
export function setVerbose(val: boolean) {
  verbose = val
}

function log(...x) {
  if (console && console.log) {
    console.log(...x)
  }
}

export interface IStateManager<T> {
  stateKey: string
  getState: () => T
  setState: (changes: Partial<T>) => any
  subscribe: (component: React.Component) => any
  subscribeHook: (callback: (state: T) => any) => any
  unSubscribe: (token) => void
}

export function tryCloneAndFreeze(state) {
  let nextState = state
  if (clone) {
    nextState = _.cloneDeep(state)
  }
  if (freeze && Object.freeze) {
    Object.freeze(nextState)
  }
  return nextState
}

export function tryFreeze(state) {
  if (freeze && Object.freeze) {
    Object.freeze(tryFreeze)
  }
}

export function createStateManager<T>(
  stateKey,
  initialState: T
): IStateManager<T> {
  let state = tryCloneAndFreeze(initialState)

  const getState = () => {
    return tryCloneAndFreeze(state)
  }

  return {
    stateKey,
    getState,
    setState: (changes: Partial<T>, sync = false) => {
      state = tryFreeze(_.assign({}, state, changes))
      if (verbose) {
        log('updated ' + stateKey)
      }
      if (sync) {
        PubSub.publishSync(stateKey)
      } else {
        PubSub.publish(stateKey) // With a frame delay
      }
    },
    subscribe: (component: React.Component) => {
      let token = PubSub.subscribe(stateKey, () => {
        component.forceUpdate()
      })
      if (verbose) {
        log('subscribed ' + stateKey + '|' + token)
      }
      return token
    },
    subscribeHook(callback: (state: T) => any) {
      let token = PubSub.subscribe(stateKey, () => {
        callback(getState())
      })
      if (verbose) {
        log('subscribed hook ' + stateKey + '|' + token)
      }
      return token
    },
    unSubscribe: token => {
      if (verbose) {
        log('unsubscribed ' + stateKey + '|' + token)
      }
      PubSub.unsubscribe(token)
    },
  }
}

// React hook
export function useSubscription<T>(stateManager: IStateManager<T>) {
  const [state, setState] = useState(stateManager.getState())

  function handleStateChange(newState: T) {
    setState(newState)
  }

  useEffect(() => {
    let subscriptionToken = stateManager.subscribeHook(handleStateChange)
    return () => {
      stateManager.unSubscribe(subscriptionToken)
    }
  })

  return state
}
