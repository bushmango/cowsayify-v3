import styles from './cowsay.scss'

import * as React from 'react'

import cowsay from 'cowsay-browser'

import Layout from '../components/Layout'

import fetch from 'isomorphic-unfetch'

const host = process.env.host

import * as stateCowsay from '../state/stateCowsay'

class Cowsaid extends React.Component<{ data: any }> {
  static async getInitialProps({ query, req }) {
    // const queryParams = { key: req.query.key }
    console.log('query', query)
    const { key } = query

    return await stateCowsay.fetchCow(key)

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
        
        {/* <div className={styles.cowBox}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div> */}
      </Layout>
    )
  }
}

export default Cowsaid
