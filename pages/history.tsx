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
        return JSON.parse(c.options)
      } catch {
        return { text: 'JSON error' }
      }
    })

    return (
      <Layout title="history">
        {_.map(items, c => (
          <div>
            {/* item{c.text} {c.action} */}
            <DisplayCow options={c} />
          </div>
        ))}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Layout>
    )
  }
}

export default History
