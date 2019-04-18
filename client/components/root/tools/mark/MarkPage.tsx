import React from 'react'

import Layout from '@components/shared/Layout'
import { _ } from '@lib/lodash'

let locationProps = [
  'hash',
  'host',
  'hostname',
  'href',
  'origin',
  'pathname',
  'port',
  'protocol',
  'search',
]

const Mark = () => {
  return (
    <Layout title='mark'>
      <MarkPage />
    </Layout>
  )
}

const MarkPage = () => {
  return (
    <div>
      <div>Mark test</div>

      {typeof window !== 'undefined' && (
        <div>
          {_.map(locationProps, (c) => (
            <div key={c}>
              <div>
                {c} | {window.location[c]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { MarkPage, Mark }
