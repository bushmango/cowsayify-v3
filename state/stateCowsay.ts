import { _ } from '../imports/lodash'
import * as React from 'react'
const stateKey = 'cowsay'
export { stateKey }

const uuidv4 = require('uuid/v4')
const shortid = require('shortid')
import Router from 'next/router'
import * as PubSub from 'pubsub-js'

const host = process.env.host

interface IStateCowsay {
  text: string
  mode: string
  eyes: string
  tongue: string
  template: string
  action: 'say' | 'think'
}

let state: IStateCowsay = {
  text: '',
  mode: '',
  eyes: '',
  tongue: '',
  template: '',
  action: 'say',
}

export function getState() {
  return _.clone(state)
}

export function setState(changes: Partial<IStateCowsay>) {
  state = _.assign({}, state, changes)
  PubSub.publish(stateKey)
}

export function subscribe(component: React.Component) {
  return PubSub.subscribe(stateKey, () => {
    component.forceUpdate()
  })
}
export function unSubscribe(token) {
  PubSub.unsubscribe(token)
}

export interface IAction {
  key: string
  label: string
}
const actions: IMode[] = [
  {
    key: 'say',
    label: 'Say',
  },
  {
    key: 'think',
    label: 'Think',
  },
]
export { actions }

export interface IMode {
  key: string
  label: string
}
const modes: IMode[] = [
  {
    key: '',
    label: 'Normal',
  },
  {
    key: 'b',
    label: 'Borg',
  },
  {
    key: 'd',
    label: 'Dead',
  },
  {
    key: 'g',
    label: 'Greedy',
  },
  {
    key: 'p',
    label: 'Paranoid',
  },
  {
    key: 's',
    label: 'Stoned',
  },
  {
    key: 't',
    label: 'Tired',
  },
  {
    key: 'w',
    label: 'Wired',
  },
  {
    key: 'y',
    label: 'Youthful',
  },
]
export { modes }

export function doShare() {
  let state = getState()
  let { text } = state

  // let key = uuidv4()
  let key = shortid.generate()
  fetch(host + '/cows', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: key,
      text: text,
      options: JSON.stringify(calcOptions()),
    }),
  }).then(r => {
    console.log('finished!')
    console.log(r.json())
    Router.push('/cowsaid?key=' + key)
  })
}

// Convert our internal options into cowsay-specific options
export function calcOptions() {
  let state = getState()
  let { text, mode } = state

  if (text.length === 0) {
    text = 'Moo'
  }

  let options: any = {
    text,
    action: state.action,
  }
  if (state.eyes) {
    options.e = state.eyes
    if (options.e.length === 1) {
      options.e += ' '
    }
  }
  if (state.tongue) {
    options.T = state.tongue
    if (options.T.length === 1) {
      options.T += ' '
    }
  }
  if (mode) {
    options[mode] = true
  }
  return options
}

export async function fetchCow(key) {
  const res = await fetch(host + '/cows/' + key)
  const data = await res.json()

  console.log('key', key)
  console.log('data', data)
  return { data }
}
