// import * as React from 'react'
// const { useState, useEffect } = React
// import * as PubSub from 'pubsub-js'
// import { _ } from '../imports/lodash'
// import * as immer from 'immer'
// function log(...x) {
//   if (console && console.log) {
//     console.log(...x)
//   }
// }
// export interface IStateManagerOptions {
//   useVerbose: boolean
//   useFreeze: boolean
//   useClone: boolean
//   useLocalStorage: boolean
//   useImmer: boolean
// }
// export interface IStateManagerLiveOptions {
//   useVerbose: boolean
// }
// export interface IStateManager<T> {
//   stateKey: string
//   getState: () => T
//   setState: (changes: Partial<T>) => any
//   produce: (producer: (draftState: T) => void) => void
//   subscribe: (component: React.Component) => any
//   subscribeHook: (callback: (state: T) => any) => any
//   unSubscribe: (token) => void
//   setOptions: (options: Partial<IStateManagerLiveOptions>) => void
//   getOptions: () => IStateManagerOptions
//   rehydrate: (changes: Partial<T>) => any
// }
// export function tryCloneAndFreeze(
//   state,
//   localStorageKey,
//   options: IStateManagerOptions
// ) {
//   let nextState = state
//   if (options.useImmer) {
//   } else if (options.useClone) {
//     nextState = _.cloneDeep(state)
//   } else if (options.useFreeze && Object.freeze) {
//     Object.freeze(nextState)
//   }
//   if (options.useLocalStorage) {
//     if (typeof localStorage !== 'undefined') {
//       localStorage.setItem(localStorageKey, JSON.stringify(nextState))
//     }
//   }
//   return nextState
// }
// export function tryFreeze(state, options: IStateManagerOptions) {
//   if (options.useImmer) {
//     // Don't freeze
//   } else if (options.useFreeze && Object.freeze) {
//     Object.freeze(tryFreeze)
//   }
// }
// export function createStateManager<T>(
//   stateKey,
//   version: string,
//   initialState: T,
//   options: Partial<IStateManagerOptions>
// ): IStateManager<T> {
//   let _options: IStateManagerOptions = _.defaults(options, {
//     useFreeze: false,
//     useClone: false,
//     useLocalStorage: true,
//     useImmer: true,
//   })
//   const localStorageKey = 'state:' + stateKey + ':' + version
//   let isRehydrated = false
//   // Try to restore our local state
//   if (_options.useLocalStorage) {
//     if (typeof localStorage !== 'undefined') {
//       let stored = localStorage.getItem(localStorageKey)
//       if (stored) {
//         try {
//           initialState = _.assign({}, initialState, JSON.parse(stored))
//         } catch (err) {
//           log('Error loading state from localStorage: ' + stateKey)
//         }
//       }
//     }
//   }
//   let state = tryCloneAndFreeze(initialState, localStorageKey, _options)
//   if (_options.useImmer) {
//     state = immer.produce(state, draftState => {})
//   }
//   const getState = () => {
//     return tryCloneAndFreeze(state, localStorageKey, _options)
//   }
//   const setState = (changes: Partial<T>, sync = false) => {
//     if (_options.useImmer) {
//       state = immer.produce(state, draftState => {
//         _.assign(draftState, changes)
//       })
//     } else {
//       state = tryFreeze(_.assign({}, state, changes), _options)
//     }
//     if (_options.useVerbose) {
//       log('updated ' + stateKey)
//     }
//     if (sync) {
//       PubSub.publishSync(stateKey)
//     } else {
//       PubSub.publish(stateKey) // With a frame delay
//     }
//   }
//   return {
//     stateKey,
//     rehydrate: (changes: Partial<T>) => {
//       if (!isRehydrated) {
//         setState(changes)
//         isRehydrated = true
//         if (options.useVerbose) {
//           log('rehydrated ' + stateKey)
//         }
//       }
//     },
//     setOptions: (options: IStateManagerOptions) => {},
//     getOptions: () => {
//       return _options
//     },
//     produce: (producer: (draftState: T) => void, sync = true) => {
//       if (_options.useImmer) {
//         state = immer.produce(state, producer)
//       } else {
//         let nextState = _.cloneDeep(state)
//         producer(nextState)
//         nextState = tryCloneAndFreeze(nextState, localStorageKey, _options)
//       }
//       if (sync) {
//         PubSub.publishSync(stateKey)
//       } else {
//         PubSub.publish(stateKey) // With a frame delay
//       }
//     },
//     getState,
//     setState,
//     subscribe: (component: React.Component) => {
//       let token = PubSub.subscribe(stateKey, () => {
//         component.forceUpdate()
//       })
//       if (options.useVerbose) {
//         log('subscribed ' + stateKey + '|' + token)
//       }
//       return token
//     },
//     subscribeHook(callback: (state: T) => any) {
//       let token = PubSub.subscribe(stateKey, () => {
//         callback(getState())
//       })
//       if (_options.useVerbose) {
//         log('subscribed hook ' + stateKey + '|' + token)
//       }
//       return token
//     },
//     unSubscribe: token => {
//       if (_options.useVerbose) {
//         log('unsubscribed ' + stateKey + '|' + token)
//       }
//       PubSub.unsubscribe(token)
//     },
//   }
// }
// // React hook
// export function useSubscription<T>(stateManager: IStateManager<T>) {
//   const [state, setState] = useState(stateManager.getState())
//   function handleStateChange(newState: T) {
//     setState(newState)
//   }
//   useEffect(() => {
//     let subscriptionToken = stateManager.subscribeHook(handleStateChange)
//     return () => {
//       stateManager.unSubscribe(subscriptionToken)
//     }
//   })
//   return state
// }
//# sourceMappingURL=stateUtil.js.map