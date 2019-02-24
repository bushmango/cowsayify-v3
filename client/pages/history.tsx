import styles from './cowsay.scss'

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

class History extends React.Component<{ data: any }> {
  static async getInitialProps({}) {
    return await stateCowsay.fetchHistory()
  }

  render() {
    let { data } = this.props

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
        <div className="page_history" />
        {_.map(items, (c, cIdx) => (
          <div key={cIdx}>
            {/* item{c.text} {c.action} */}
            <div className="date">{c.created}</div>
            <DisplayCow options={c.options} />
          </div>
        ))}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </Layout>
    )
  }
}

export default History
