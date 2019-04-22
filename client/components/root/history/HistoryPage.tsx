import styles from './HistoryPage.scss'

import React from 'react'
import { _ } from '@lib/lodash'

import Layout from '@components/shared/Layout'

import DisplayCow from '@components/shared/DisplayCow'

import * as minionHistory from '@state/minionHistory'

interface IDataListItem {
  text: string
  action: string
}
interface IDataList {
  Items: []
  Count: number
  ScannedCount: number
}

const History = (props: { fromServer: boolean; serverStateHistory: any }) => {
  return (
    <Layout title='history'>
      <HistoryPage {...props} />
    </Layout>
  )
}

History.getInitialProps = async ({ req }) => {
  const fromServer = !!req
  await minionHistory.fetchHistory()
  return {
    serverStateHistory: minionHistory.dehydrate(fromServer),
  }
}

const HistoryPage = (props: { serverStateHistory: any }) => {
  minionHistory.rehydrate(props.serverStateHistory)
  const history = minionHistory.useSubscribe()
  let { fetchedHistory } = history

  if (!fetchedHistory || fetchedHistory.error) {
    return (
      <div>
        Error
        {/* <br />
        Server <pre>{JSON.stringify(props.serverStateHistory, null, 2)}</pre>
        <br />
        Local <pre>{JSON.stringify(history, null, 2)}</pre> */}
      </div>
    )
  }

  let items: {
    created?: string
    options?: any
    text?: string
  }[] = _.map(fetchedHistory.data.Items, (c) => {
    try {
      return {
        created: c.created || 'Before history',
        options: JSON.parse(c.options),
      }
    } catch (err) {
      return { text: 'JSON error' }
    }
  })

  return (
    <div>
      <h1>Messages sent with cowsayify</h1>
      <div className={styles.pageHistory}>
        {_.map(items, (c, cIdx) => (
          <div key={cIdx}>
            {/* item{c.text} {c.action} */}
            <div className={styles.date}>{c.created}</div>
            <DisplayCow options={c.options} />
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}

export { History, HistoryPage }
