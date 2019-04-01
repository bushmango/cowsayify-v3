import * as React from 'react'

import Link from 'next/link'
import { _ } from 'imports/lodash'

function ServerlessLink(props: {
  href: string
  as?: string
  children: React.ReactNode
}) {
  let href = props.href
  let as = props.as
  if (_.startsWith(href, '/')) {
    // Add our host

    if (typeof window != 'undefined') {
      if (_.startsWith(window.location.pathname, '/dev/')) {
        href = '/dev' + href
        if (as) {
          as = '/dev' + as
        }
      }
      if (_.startsWith(window.location.pathname, '/prod/')) {
        href = '/prod' + href
        if (as) {
          as = '/prod' + as
        }
      }
    }
  }

  return (
    <div>
      Click{' '}
      <Link href={href} as={as}>
        <a>{props.children}</a>
      </Link>
    </div>
  )
}

export { ServerlessLink }
