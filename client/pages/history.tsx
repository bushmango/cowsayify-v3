import historyStyles from './history.scss'

import * as React from 'react'
import { _ } from '../imports/lodash'

import Layout from '../components/Layout'

import DisplayCow from '../components/DisplayCow'

import * as stateUtil from '../state/stateUtil'
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

function HistoryPage(props: { _fetchedHistory: any }) {
  const history = stateUtil.useSubscription(stateHistory.stateManager)
  let { fetchedHistory } = history

  if (!fetchedHistory || fetchedHistory.error) {
    return (
      <Layout title="oh noes">
        Error <pre>{JSON.stringify(props._fetchedHistory, null, 2)}</pre>
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
      <div className={historyStyles.page_history}>
        {_.map(items, (c, cIdx) => (
          <div key={cIdx}>
            {/* item{c.text} {c.action} */}
            <div className={historyStyles.date}>{c.created}</div>
            <DisplayCow options={c.options} />
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </Layout>
  )
}

HistoryPage.getInitialProps = async ({ req }) => {
  return await stateHistory.fetchHistory()
}

export default HistoryPage
