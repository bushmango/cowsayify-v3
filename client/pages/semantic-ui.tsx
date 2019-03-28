import * as React from 'react'
import { useState } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import * as _ from 'lodash'

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
function SemanticUiPage(props: { data: any }) {
  return (
    <Layout title="semantic ui test">
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>

      <h2>Semantic UI test</h2>
      <div style={{ padding: '2em' }}>
        <Button>Click Here</Button>
        <Divider />
        <div style={{ maxWidth: '300px' }}>
          <Dropdown
            placeholder="Select Friend"
            fluid
            selection
            options={friendOptions}
          />
        </div>
      </div>
    </Layout>
  )
}

export default SemanticUiPage
