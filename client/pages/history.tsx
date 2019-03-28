import styles from './history.scss'

import * as React from 'react'
import { _ } from '../imports/lodash'

import Layout from '../components/Layout'

import DisplayCow from '../components/DisplayCow'

import * as midboss from 'midboss'
import * as stateHistory from '../state/stateHistory'

interface IDataListItem {
  text: string
  action: string
}
interface IDataList {
  Items: []
  Count: number
  ScannedCount: number
}

function HistoryPage(props: { fromServer: boolean; serverStateHistory: any }) {
  if (props.fromServer && props.serverStateHistory) {
    stateHistory.stateManager.rehydrate(props.serverStateHistory)
  }

  const history = midboss.useSubscription(stateHistory.stateManager)
  let { fetchedHistory } = history

  if (!fetchedHistory || fetchedHistory.error) {
    return (
      <Layout title="oh noes">
        Error
        {/* <br />
        Server <pre>{JSON.stringify(props.serverStateHistory, null, 2)}</pre>
        <br />
        Local <pre>{JSON.stringify(history, null, 2)}</pre> */}
      </Layout>
    )
  }

  let items: {
    created?: string
    options?: any
    text?: string
  }[] = _.map(fetchedHistory.data.Items, c => {
    try {
      return {
        created: c.created || 'Before history',
        options: JSON.parse(c.options),
      }
    } catch {
      return { text: 'JSON error' }
    }
  })

  return (
    <Layout title="history">
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
    </Layout>
  )
}

HistoryPage.getInitialProps = async ({ req }) => {
  const fromServer = !!req
  await stateHistory.fetchHistory()

  return {
    fromServer,
    serverStateHistory: fromServer
      ? stateHistory.stateManager.getState()
      : null,
  }
}

export default HistoryPage
