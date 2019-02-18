import styles from './cowsay.scss'

import * as React from 'react'

import cowsay from 'cowsay-browser'

import Layout from '../components/Layout'

import fetch from 'isomorphic-unfetch'

class Cowsaid extends React.Component<{ data: any }> {
  static async getInitialProps({ req }) {
    const res = await fetch('http://localhost:4000/cows/test-key')
    const data = await res.json()
    console.log('data', data)
    return { data }
  }

  render() {
    let { data } = this.props
    let { key, text, options } = data

    if (text.length === 0) {
      text = 'Moo'
    }
    options = JSON.parse(options)
    options.text = text

    return (
      <Layout title="cowsaid">
        The cow said... {key}
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
