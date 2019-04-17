import React from 'react'

import styles from './IndexPage.scss'
// const styles = require('./index.scss')

import Layout from '@components/shared/Layout'

import * as router from '@state/router'

const Index = () => {
  return (
    <Layout title='home'>
      <IndexPage />
    </Layout>
  )
}

const IndexPage = (props: any) => {
  React.useEffect(() => {
    // Simple redirect
    router.navTo('/cowsay')
  })

  return (
    <div>
      <div className={styles.welcome}>Welcome to Cowsayify.com!</div>
      <div>
        {/* <img
      src="/static/images/caffeine-coffee-cup-374780.jpg"
      style={{ width: '300px', height: 'auto' }}
    /> */}
      </div>
    </div>
  )
}

export { Index, IndexPage }
