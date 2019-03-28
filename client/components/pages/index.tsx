import * as React from 'react'

import styles from './index.scss'
// const styles = require('./index.scss')

import Layout from '../shared/Layout'
import Head from 'next/head'
import Header from '../shared/Header'

class IndexPage extends React.Component<{ data: any }> {
  componentDidMount() {
    // Simple redirect
    window.location.href = '/cowsay'
  }

  render() {
    return (
      <Layout title="home">
        <div className={styles.welcome}>Welcome to Cowsayify.com!</div>
        <div>
          {/* <img
          src="/static/images/caffeine-coffee-cup-374780.jpg"
          style={{ width: '300px', height: 'auto' }}
        /> */}
        </div>
      </Layout>
    )
  }
}

export { IndexPage }
