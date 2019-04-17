import React from 'react'

import Link from 'next/link'
import { _ } from '@lib/lodash'

import * as router from '@state/router'

function ServerlessLink(props: {
  href: string
  as?: string
  children: React.ReactNode
}) {
  let href = router.correctHref(props.href)

  return (
    <a
      href={href}
      onClick={(ev) => {
        ev.preventDefault()
        router.navTo(props.href, props.as)
        return false
      }}
    >
      {props.children}
    </a>
  )

  // return (
  //   <Link href={href} as={as}>
  //     <a>{props.children}</a>
  //   </Link>
  // )
}

export { ServerlessLink }
