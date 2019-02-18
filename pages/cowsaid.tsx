import styles from './cowsay.scss'

import * as React from 'react'

import cowsay from 'cowsay-browser'

import Layout from '../components/Layout'

import fetch from 'isomorphic-unfetch'

const host = process.env.host

class Cowsaid extends React.Component<{ data: any }> {
  static async getInitialProps({ query, req }) {
    // const queryParams = { key: req.query.key }
    console.log('query', query)
    const { key } = query

    const res = await fetch(host + '/cows/' + key)
    const data = await res.json()

    console.log('key', key)
    console.log('data', data)
    return { data }
  }

  render() {
    let { data } = this.props
    let { key, text, options } = data

    if (!text || text.length === 0) {
      text = 'Moo'
    }

    if (data.error || !options) {
      text = '404 cow not found!'
      options = { d: true }
      options.text = text
    } else {
      options = JSON.parse(options || {})
      options.text = text
    }

    return (
      <Layout title="cowsaid">
        <div className={styles.cowBox}>
          <pre>{cowsay.say(options)}</pre>
        </div>
        {/* <div className={styles.cowBox}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div> */}
      </Layout>
    )
  }
}

export default Cowsaid
