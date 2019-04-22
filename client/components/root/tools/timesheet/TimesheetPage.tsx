import React from 'react'
import { useState } from 'react'
import Layout from '@components/shared/Layout'
import Head from 'next/head'
import * as _ from 'lodash'

import * as minionTimesheet from '@state/minionTimesheet'

const onChange = (idx, field, ev) => {
  minionTimesheet.changeLine(idx, field, ev.target.value)
  minionTimesheet.update()
}

const days = ['M', 'Tu', 'W', 'Th', 'F']

const Line = ({ idx, line, verbose }) => {
  return (
    <div style={{ marginBottom: '1em', display: 'flex' }}>
      <div style={{ width: '45px' }}>{days[idx]}</div>
      {verbose && (
        <div>
          <Input value={line.a} idx={idx} field={'a'} />
        </div>
      )}
      <div style={{ width: '75px' }}>
        {minionTimesheet.formatTime(
          minionTimesheet.getMagicMinutesString(line.a)
        )}
      </div>
      {verbose && (
        <div>
          <Input value={line.b} idx={idx} field={'b'} />
        </div>
      )}
      <div style={{ width: '75px' }}>
        {minionTimesheet.formatTime(
          minionTimesheet.getMagicMinutesString(line.b) + 12 * 60
        )}
      </div>
      {verbose && (
        <div>
          <Input value={line.c} idx={idx} field={'c'} />
        </div>
      )}
      <div style={{ width: '75px' }}>
        {minionTimesheet.formatTime(
          minionTimesheet.getMagicMinutesString(line.c) + 12 * 60
        )}
      </div>
      <div />
      <div>
        {/* minutes: {line.minutes} | hours: {(line.minutes / 60).toFixed(2)} */}
        Hours: {(line.minutes / 60).toFixed(2)}
      </div>
    </div>
  )
}
const Input = ({ value, idx, field }) => {
  return (
    <div>
      {/* {idx + '-' + field} */}
      <input
        style={{ width: '50px' }}
        value={value}
        onChange={(ev) => {
          onChange(idx, field, ev)
        }}
      />
    </div>
  )
}

const Timesheet = (props: {}) => {
  return (
    <Layout title='timesheet tool'>
      <Head>
        <link
          rel='stylesheet'
          href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
        />
      </Head>
      <TimesheetPage />
    </Layout>
  )
}
const TimesheetPage = (props: {}) => {
  const state = minionTimesheet.useSubscribe()

  return (
    <div style={{ padding: '2em' }}>
      <h2>Timesheet tool</h2>
      <div>
        {_.map(state.lines, (c, cIdx) => (
          <Line key={cIdx} idx={cIdx} line={state.lines[cIdx]} verbose={true} />
        ))}
      </div>
      <div>
        {_.map(state.lines, (c, cIdx) => (
          <Line
            key={cIdx}
            idx={cIdx}
            line={state.lines[cIdx]}
            verbose={false}
          />
        ))}
      </div>
      <div>Hours: {(state.totals.minutes / 60).toFixed(2)}</div>
    </div>
  )
}

export { TimesheetPage, Timesheet }
