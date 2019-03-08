import * as React from 'react'
import { useState } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import * as _ from 'lodash'

import * as stateUtil from '../state/stateUtil'
import * as stateMongo from '../state/stateMongo'

import { Button } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
const friendOptions = [
  {
    text: 'Jenny Hess',
    value: 'Jenny Hess',
  },
  {
    text: 'Another person',
    value: 'Another person',
  },
]

function MinimongoTest(props: { data: any }) {
  const state = stateUtil.useSubscription(stateMongo.stateManager)

  React.useEffect(() => {
    stateMongo.fetchTest()
  })

  return (
    <Layout title="minimongo test">
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <h2>Minimongo test</h2>
      Zip codes
      <div>
        {_.map(state.fetchedTest, c => (
          <div>
            <pre>{JSON.stringify(c, null, 2)}</pre>
          </div>
        ))}
      </div>
      {/* <pre>{state.fetchedTest}</pre> */}
    </Layout>
  )
}

export default MinimongoTest
