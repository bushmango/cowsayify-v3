import Router from 'next/router'
import { _ } from '../imports/lodash'

export function navTo(href: string) {
  Router.push(href)
}

export function correctHref(href: string) {
  if (_.startsWith(href, '/')) {
    // Add our host
    // TODO: work on the server?
    if (typeof window != 'undefined') {
      if (_.startsWith(window.location.pathname, '/dev/')) {
        href = '/dev' + href
      }
      if (_.startsWith(window.location.pathname, '/prod/')) {
        href = '/prod' + href
      }
    }
  }
  return href
}

export function correctAs(as: string) {
  if (!as) {
    return as
  }
  return correctHref(as)
}
