import Router from 'next/router'
// import { _ } from '../imports/lodash'
import * as _ from 'lodash'

export function navTo(href: string) {
  Router.push(correctHref(href))
}

let prefix = ''
let staticPrefix = ''
function getPrefix() {
  if (typeof window != 'undefined') {
    if (_.startsWith(window.location.origin, 'http://localhost:')) {
      prefix = ''
      staticPrefix = ''
    } else if (_.startsWith(window.location.pathname, '/dev/')) {
      prefix = '/dev'
      staticPrefix = 'https://serverless-cowsay-3.s3.amazonaws.com/dev'
    } else if (_.startsWith(window.location.pathname, '/prod/')) {
      prefix = '/prod'
      staticPrefix = 'https://serverless-cowsay-3.s3.amazonaws.com/prod'
    } else {
      prefix = ''
      staticPrefix = 'https://serverless-cowsay-3.s3.amazonaws.com/prod'
    }
  }
}
getPrefix()

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
    return as
  }
  return correctHref(as)
}
