import React from 'react'
const { useEffect } = React

import styles from './../styles.scss'
// const styles = require('./styles.scss')

import Head from 'next/head'
import Header from './Header'

import * as router from '@state/router'
import * as log from '@state/log'

import * as midboss from 'midboss'
import * as midbossTheme from '@state/minionTheme'

import { Pace } from './Pace'

import ReactGA from 'react-ga'
const googleAnalyticsTrackingId = 'UA-135264357-1'

let lastUrl = null
const Layout = (props: { title: string; children: React.ReactNode }) => {
  const stateTheme = midbossTheme.useSubscribe()

  useEffect(() => {
    ReactGA.initialize(googleAnalyticsTrackingId)
    log.x('ga init -> ' + googleAnalyticsTrackingId)
  }, [])

  useEffect(() => {
    // Update the document title using the browser API
    let url = window.location.pathname + window.location.search
    if (url !== lastUrl) {
      lastUrl = url
      if (
        location.hostname === 'localhost' ||
        location.hostname === '127.0.0.1' ||
        location.hostname === ''
      ) {
        log.x('page -> ' + url)
      } else {
        log.x('ga -> ' + url)
        ReactGA.pageview(url)
      }
    }
  })

  if (!stateTheme) {
    return null
  }

  return (
    <div className={styles.layout}>
      <Pace isLoading={stateTheme.isLoading} />
      <Head>
        <title>Cowsayify - {props.title}!</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Nunito:300,400,500'
        />
        {/* <link
          rel="stylesheet"
          href={router.correctStatic('/static/css/antd.min.css')}
        /> */}
      </Head>
      <Header />
      {props.children}
    </div>
  )
}

export default Layout
