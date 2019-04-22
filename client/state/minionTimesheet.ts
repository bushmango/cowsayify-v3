import * as midboss from 'midboss'
import { _ } from '@lib/lodash'

export interface IStateTimesheet {
  lines: { a: string; b: string; c: string; minutes: number }[]
  totals: {
    minutes: number
  }
}

let initialState: IStateTimesheet = {
  lines: [
    { a: '', b: '', c: '', minutes: 0 },
    { a: '', b: '', c: '', minutes: 0 },
    { a: '', b: '', c: '', minutes: 0 },
    { a: '', b: '', c: '', minutes: 0 },
    { a: '', b: '', c: '', minutes: 0 },
  ],
  totals: {
    minutes: 0,
  },
}

const stateManager = midboss.createMidboss('timesheet', '1.0.0', initialState, {
  useLocalStorage: true,
})
export function useSubscribe() {
  return midboss.useSubscription(stateManager)
}

let mongoUrl = 'http://localhost:3008/mongo-api/v1/'

export async function update() {
  let search = ''
  stateManager.produce((draftState) => {
    // draftState.isLoading = true
    // search = draftState.search
    draftState.totals.minutes = 0
    _.forEach(draftState.lines, (line) => {
      let a = getMagicMinutesString(line.a)
      let b = getMagicMinutesString(line.b)
      let c = getMagicMinutesString(line.c) + getMagicMinutesString('1200')
      let total = c - b - a
      line.minutes = total
      draftState.totals.minutes += total
    })
  })
}
export function changeLine(idx, field, newVal) {
  stateManager.produce((ds) => {
    ds.lines[idx][field] = newVal
  })
}

export function getMagicMinutesString(s: string) {
  if (!s || !s.trim()) {
    return 0
  }

  let num = parseInt(s)

  if (s.length > 2) {
    // Has hours
    let minutes = num % 100
    let hours = (num - minutes) / 100
    return hours * 60 + minutes
  } else {
    // Just minutes
    return num
  }
}

export function formatTime(numMinutes: number) {
  let minutes = numMinutes % 60
  let hours = (numMinutes - minutes) / 60

  let minutesS = '' + minutes
  if (minutesS.length === 1) {
    minutesS = '0' + minutesS
  }
  return hours + '' + minutesS
}
