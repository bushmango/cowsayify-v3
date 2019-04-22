import React from 'react'
import { useState } from 'react'
import Layout from '@components/shared/Layout'
import Head from 'next/head'
import * as _ from 'lodash'

import * as minionMongo from '@state/minionMongo'

const onChange = (ev) => {
  // let hasChange = false
  // minionMongo.stateManager.produce((ds) => {
  //   if (ds.search !== ev.target.value) {
  //     ds.search = ev.target.value
  //     hasChange = true
  //   }
  // })
  // if (hasChange) {
  //   minionMongo.fetchMongo()
  // }
}

const Zip = ({ zip }) => {
  return (
    <div style={{ marginBottom: '1em' }}>
      <div>
        <strong>{zip.zip}</strong>
      </div>
      <div>
        {zip.city}, {zip.state} - {zip.pop} people
      </div>
      <div>
        {zip.lattitude} | {zip.longitude}
      </div>
      {/* <pre>{JSON.stringify(zip, null, 2)}</pre> */}
    </div>
  )
}

function MongoTest(props: { data: any }) {
  const state = minionMongo.useSubscribe()

  React.useEffect(() => {
    if (!state.fetchedMongo) {
      minionMongo.fetchMongo()
    }
  })

  return (
    <Layout title='mongo test'>
      <Head>
        <link
          rel='stylesheet'
          href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
        />
      </Head>
      <div style={{ padding: '2em' }}>
        <h2>Minimongo test</h2>

        <button onClick={async () => alert(await minionMongo.getTotalPop())}>
          Get count
        </button>

        <input value={state.search} onChange={onChange} />
        {state.isLoading ? 'LOADING' : ''}
        <h3>Zip codes</h3>
        <div>
          {_.map(state.fetchedMongo, (c, cIdx) => (
            <Zip key={cIdx} zip={c} />
          ))}
        </div>
      </div>
      {/* <pre>{state.fetchedTest}</pre> */}
    </Layout>
  )
}

export default MongoTest
