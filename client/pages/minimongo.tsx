import * as React from 'react'
import { useState } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import * as _ from 'lodash'

import fetch from 'isomorphic-unfetch'

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

let mongoUrl = 'http://localhost:3006/mongo-api/v1/'

const fetchTestData = async () => {}

function MinimongoTest(props: { data: any }) {
  const [zips, setZips] = React.useState()

  React.useEffect(() => {
    const f = async () => {
      let data = await fetch(mongoUrl + 'test')
      setZips(await data.json())
    }
    f()
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
      ZIIIPS
      {/* <div>
        {_.map(zips, c => (
          <div>
            <pre>{JSON.stringify(c)}</pre>
          </div>
        ))}
      </div> */}
      <pre>{zips}</pre>
    </Layout>
  )
}

export default MinimongoTest
