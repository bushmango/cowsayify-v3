import * as React from 'react'

import Layout from '../../shared/Layout'
import { _ } from '../../../imports/lodash'

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

const LocationPage = () => {
  return (
    <Layout title="location">
      <div>Window location props</div>

      {typeof window !== 'undefined' && (
        <div>
          {_.map(locationProps, c => (
            <div key={c}>
              <div>
                {c} | {window.location[c]}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}

export { LocationPage }
