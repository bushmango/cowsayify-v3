import * as React from 'react'

import styles from './IndexPage.scss'
// const styles = require('./index.scss')

import Layout from '../shared/Layout'

import * as router from '../../state/router'

const IndexPage = (props: any) => {
  React.useEffect(() => {
    // Simple redirect
    router.navTo('/cowsay')
  })

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

export { IndexPage }
