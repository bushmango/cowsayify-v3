import historyStyles from './history.scss'

import * as React from 'react'
import { _ } from '../imports/lodash'

import Layout from '../components/Layout'

import DisplayCow from '../components/DisplayCow'

import * as stateCowsay from '../state/stateCowsay'

interface IDataListItem {
  text: string
  action: string
}
interface IDataList {
  Items: []
  Count: number
  ScannedCount: number
}

function HistoryPage(props: { data: any }) {
  let { data } = props

  if (!data || data.error) {
    return <Layout title="oh noes">Error</Layout>
  }

  let items = _.map(data.data.Items, c => {
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
  return await stateCowsay.fetchHistory()
}

export default HistoryPage
