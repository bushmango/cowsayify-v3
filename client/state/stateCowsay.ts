import * as midboss from 'midboss'
const midbossKey = 'cowsay'
export { midbossKey }

import { _ } from '../imports/lodash'
import moment from 'moment'

import cowsay from 'cowsay-browser'
import fetch from 'isomorphic-unfetch'
// const uuidv4 = require('uuid/v4')
const shortid = require('shortid')
import Router from 'next/router'

const host = process.env.host

export interface IStateCowsay {
  text: string
  mode: string
  eyes: string
  tongue: string
  template: string
  action: 'say' | 'think'
  cow: string
  cowList: string[]
}

let initialState: IStateCowsay = {
  text: '',
  mode: '',
  eyes: '',
  tongue: '',
  template: '',
  action: 'say',
  cow: 'default',
  cowList: [],
}

const stateManager = midboss.createMidboss(
  midbossKey,
  '1.0.0',
  initialState,
  {}
)
export { stateManager }

function init() {
  // Get our list of cows
  cowsay.list((err, result) => {
    //stateManager.setState({ cowList: result })
    if (!err) {
      stateManager.produce(draftState => {
        draftState.cowList = result
      })
    }
  })
}
init()

export interface IAction {
  key: string
  label: string
}
const actions: IAction[] = [
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
  let state = stateManager.getState()
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
      created: moment().format(),
    }),
  }).then(r => {
    //Router.push('/cowsaid?key=' + key)
    Router.push('/cowsaid/' + key)
  })
}

export interface ICowOptions {
  text: string
  action: 'think' | 'say'
  f?: string
  e?: string
  T?: string
  b?: boolean
  d?: boolean
  g?: boolean
  p?: boolean
  s?: boolean
  t?: boolean
  w?: boolean
  y?: boolean
}

// Convert our internal options into cowsay-specific options
export function calcOptions(): ICowOptions {
  let state = stateManager.getState()
  let { text, mode } = state

  if (text.length === 0) {
    text = 'Moo'
  }

  let options: any = {
    text,
    action: state.action,
  }
  if (state.cow && state.cow !== 'default') {
    options.f = state.cow
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

  return { data }
}

export async function fetchHistory() {
  const res = await fetch(host + '/cows-list')
  const data = await res.json()

  return { data: data }
}
