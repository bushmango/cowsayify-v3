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

const Location = () => {
  return (
    <Layout title='location'>
      <LocationPage />
    </Layout>
  )
}

const LocationPage = () => {
  return (
    <div>
      <div>Window location props</div>

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

export { LocationPage, Location }
