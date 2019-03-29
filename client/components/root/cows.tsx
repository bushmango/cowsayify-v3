import * as React from 'react'
import { _ } from '../../imports/lodash'

import DisplayCow from '../shared/DisplayCow'

import Layout from '../shared/Layout'

import * as midboss from 'midboss'
import * as stateCowsay from '../../state/stateCowsay'

const CowsPage = (props: any) => {
  const cowsay = midboss.useSubscription(stateCowsay.stateManager)

  return (
    <Layout title="cows">
      <h1>Cows</h1>
      <h2>These are the 'cows' you can use with cowsayify</h2>
      {_.map(cowsay.cowList, c => (
        <div key={c}>
          {/* <div> {c} </div> */}
          <div>
            <DisplayCow options={{ text: c, f: c, action: 'say' }} />
          </div>
        </div>
      ))}
    </Layout>
  )
}

export { CowsPage }