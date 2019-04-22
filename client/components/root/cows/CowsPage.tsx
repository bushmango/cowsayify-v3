import React from 'react'
import { _ } from '@lib/lodash'

import DisplayCow from '@components/shared/DisplayCow'

import Layout from '@components/shared/Layout'

import * as midboss from 'midboss'
import * as minionCowsay from '@state/minionCowsay'

const Cows = () => {
  return (
    <Layout title='cows'>
      <CowsPage />
    </Layout>
  )
}

const CowsPage = () => {
  const cowsay = minionCowsay.useSubscribe()

  return (
    <div>
      <h1>Cows</h1>
      <h2>These are the 'cows' you can use with cowsayify</h2>
      {_.map(cowsay.cowList, (c) => (
        <div key={c}>
          {/* <div> {c} </div> */}
          <div>
            <DisplayCow options={{ text: c, f: c, action: 'say' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export { Cows, CowsPage }
