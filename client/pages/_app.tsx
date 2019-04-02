import React from 'react'
import App, { Container } from 'next/app'
import * as router from '../state/router'
import * as log from '../state/log'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let host = ''
    if (ctx.req) {
      host = ctx.req.get('host')
    }
    router.getPrefix(host, ctx.pathname)

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = (this as any).props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
