import * as React from 'react'
import { _ } from '../imports/lodash'

import DisplayCow from '../components/DisplayCow'

import Layout from '../components/Layout'

import * as stateUtil from '../state/stateUtil'
import * as stateCowsay from '../state/stateCowsay'

const Cows = (props: any) => {
  const cowsay = stateUtil.useSubscription(stateCowsay.stateManager)

  return (
    <Layout title="cows">
      <h1>Cows</h1>
      <h2>These are the 'cows' you can use with cowsayify</h2>
      {_.map(cowsay.cowList, c => (
        <div key={c}>
          {/* <div> {c} </div> */}
          <div>
            <DisplayCow options={{ text: c, f: c }} />
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default Cows
