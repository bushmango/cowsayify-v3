import Router from 'next/router'
// import { _ } from '../imports/lodash'
import * as _ from 'lodash'
import * as log from './log'

const s3Bucket = 'https://serverless-cowsay-3.s3.amazonaws.com'

export function navTo(href: string) {
  Router.push(correctHref(href))
}

let prefix = ''
let staticPrefix = ''
export function getPrefix(origin, pathname) {
  if (typeof window != 'undefined') {
    origin = window.location.origin
    pathname = window.location.pathname
  }

  log.x('getPrefix', origin, pathname)

  if (origin.indexOf('localhost:') !== -1) {
    prefix = ''
    staticPrefix = ''
  } else if (_.startsWith(pathname, '/dev/')) {
    prefix = '/dev'
    staticPrefix = s3Bucket + '/dev'
  } else if (_.startsWith(pathname, '/prod/')) {
    prefix = '/prod'
    staticPrefix = s3Bucket + '/prod'
  } else {
    prefix = ''
    staticPrefix = s3Bucket + '/prod'
  }
}
getPrefix('', '')

export function correctStatic(href: string) {
  if (typeof window != 'undefined') {
    if (_.startsWith(window.location.origin, 'http://localhost:')) {
      return href
    } else {
      return staticPrefix + href
    }
  }
}

export function correctHref(href: string) {
  if (_.startsWith(href, '/')) {
    // Add our host
    // TODO: work on the server?
    href = prefix + href
  }
  return href
}

export function correctAs(as: string) {
  if (!as) {
    return null
  }
  return correctHref(as)
}
