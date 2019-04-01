import * as React from 'react'

import Link from 'next/link'
import { _ } from 'imports/lodash'

import * as router from './../state/router'

function ServerlessLink(props: {
  href: string
  as?: string
  children: React.ReactNode
}) {
  let href = router.correctHref(props.href)
  let as = router.correctAs(props.as)

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
