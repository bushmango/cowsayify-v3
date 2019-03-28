import * as React from 'react'
const { useEffect } = React

import styles from './../styles.scss'
// const styles = require('./styles.scss')

import Head from 'next/head'
import Header from './Header'

import ReactGA from 'react-ga'
const googleAnalyticsTrackingId = 'UA-135264357-1'
ReactGA.initialize(googleAnalyticsTrackingId)
log('ga init -> ' + googleAnalyticsTrackingId)

function log(...x) {
  if (console && console.log) {
    console.log(...x)
  }
}

let lastUrl = null
const Layout = (props: { title: string; children: any }) => {
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
        log('page -> ' + url)
      } else {
        log('ga -> ' + url)
        ReactGA.pageview(url)
      }
    }
  })

  return (
    <div className={styles.layout}>
      <Head>
        <title>Cowsayify - {props.title}!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Nunito:300,400,500"
        />
        <link rel="stylesheet" href="/static/css/antd.min.css" />
      </Head>
      <Header />
      {props.children}
    </div>
  )
}

export default Layout
