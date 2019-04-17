import Router from 'next/router'
// import { _ } from '../imports/lodash'
import * as _ from 'lodash'
import * as log from './log'

import * as midbossTheme from './midbossTheme'
import { reactTesting } from '@lib/reactTesting'

const s3Bucket = 'https://serverless-cowsay-v3-dev-001.s3.amazonaws.com'

export function navTo(href: string, as?: string) {
  if (reactTesting.isInTesting()) {
    return false
  }
  Router.push(correctHref(href), correctAs(as))
}

let prefix = ''
let staticPrefix = ''
let isLocal = false
export function getPrefix(origin, pathname) {
  if (typeof window != 'undefined') {
    origin = window.location.origin
    pathname = window.location.pathname
    if (origin.indexOf('localhost:') !== -1) {
      isLocal = true
      prefix = ''
      staticPrefix = ''
    } else if (_.startsWith(pathname, '/dev')) {
      prefix = '/dev'
      staticPrefix = s3Bucket //+ '/dev'
    } else if (_.startsWith(pathname, '/prod')) {
      prefix = '/prod'
      staticPrefix = s3Bucket //+ '/prod'
    } else {
      prefix = ''
      staticPrefix = s3Bucket //+ '/prod'
    }
  }
  if (typeof process != 'undefined') {
    let stage = process.env.NODE_STAGE
    if (stage === 'dev') {
      isLocal = false
      prefix = '/dev'
      staticPrefix = s3Bucket + prefix
      return
    }
    if (stage === 'prod') {
      isLocal = false
      prefix = '/prod'
      staticPrefix = s3Bucket + prefix
      return
    }
  }
}
getPrefix('', '')

export function correctStatic(href: string) {
  if (isLocal) {
    return href
  } else {
    return staticPrefix + href
  }
}

export function correctHref(href: string) {
  if (_.startsWith(href, '/')) {
    // Add our host
    href = prefix + href
  }
  return href
}

export function correctAs(as: string) {
  if (!as) {
    return undefined
  }
  return correctHref(as)
}

Router.events.on('routeChangeStart', (url) => {
  log.x('App is changing to: ', url)
  midbossTheme.setLoading(true)
})
Router.events.on('routeChangeComplete', (url) => {
  log.x('App changed to: ', url)
  midbossTheme.setLoading(false)
})
