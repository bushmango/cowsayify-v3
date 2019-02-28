import * as React from 'react'
const { useState, useEffect } = React
import * as PubSub from 'pubsub-js'
import { _ } from '../imports/lodash'

function log(...x) {
  if (console && console.log) {
    console.log(...x)
  }
}

export interface IStateManagerOptions {
  useVerbose: boolean
  useFreeze: boolean
  useClone: boolean
  useLocalStorage: boolean
}
export interface IStateManager<T> {
  stateKey: string
  getState: () => T
  setState: (changes: Partial<T>) => any
  subscribe: (component: React.Component) => any
  subscribeHook: (callback: (state: T) => any) => any
  unSubscribe: (token) => void
  setOptions: (options: Partial<IStateManagerOptions>) => void
  getOptions: () => IStateManagerOptions
}

export function tryCloneAndFreeze(
  state,
  localStorageKey,
  options: IStateManagerOptions
) {
  let nextState = state
  if (options.useClone) {
    nextState = _.cloneDeep(state)
  }
  if (options.useFreeze && Object.freeze) {
    Object.freeze(nextState)
  }
  if (options.useLocalStorage) {
    localStorage.setItem(localStorageKey, JSON.stringify(nextState))
  }
  return nextState
}

export function tryFreeze(state, options: IStateManagerOptions) {
  if (options.useFreeze && Object.freeze) {
    Object.freeze(tryFreeze)
  }
}

export function createStateManager<T>(
  stateKey,
  version: string,
  initialState: T,
  options: Partial<IStateManagerOptions>
): IStateManager<T> {
  let _options: IStateManagerOptions = _.defaults(options, {
    useFreeze: true,
    useClone: false,
    useLocalStorage: true,
  })

  const localStorageKey = 'state:' + stateKey + ':' + version

  // Try to restore our local state
  if (_options.useLocalStorage) {
    let stored = localStorage.getItem(localStorageKey)
    if (stored) {
      try {
        initialState = _.assign({}, initialState, JSON.parse(stored))
      } catch (err) {
        log('Error loading state from localStorage: ' + stateKey)
      }
    }
  }

  let state = tryCloneAndFreeze(initialState, localStorageKey, _options)
  const getState = () => {
    return tryCloneAndFreeze(state, localStorageKey, _options)
  }

  return {
    stateKey,
    setOptions: (options: IStateManagerOptions) => {},
    getOptions: () => {
      return _options
    },
    setState: (changes: Partial<T>, sync = false) => {
      state = tryFreeze(_.assign({}, state, changes), _options)
      if (_options.useVerbose) {
        log('updated ' + stateKey)
      }
      if (sync) {
        PubSub.publishSync(stateKey)
      } else {
        PubSub.publish(stateKey) // With a frame delay
      }
    },
    getState,
    subscribe: (component: React.Component) => {
      let token = PubSub.subscribe(stateKey, () => {
        component.forceUpdate()
      })
      if (options.useVerbose) {
        log('subscribed ' + stateKey + '|' + token)
      }
      return token
    },
    subscribeHook(callback: (state: T) => any) {
      let token = PubSub.subscribe(stateKey, () => {
        callback(getState())
      })
      if (_options.useVerbose) {
        log('subscribed hook ' + stateKey + '|' + token)
      }
      return token
    },
    unSubscribe: token => {
      if (_options.useVerbose) {
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
