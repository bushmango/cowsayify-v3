import * as React from 'react'
import { _ } from '../imports/lodash'
const { useState, useEffect } = React

import DisplayCow from '../components/DisplayCow'

import Layout from '../components/Layout'

import cowsay from 'cowsay-browser'
import * as stateCowsay from '../state/stateCowsay'
import { modes, actions } from '../state/stateCowsay'

const Cows = (props: any) => {
  const [cows, setCows] = useState([])

  useEffect(() => {
    cowsay.list((err, result) => {
      setCows(result)
    })
  })

  return (
    <Layout title="cows">
      <h1>Cows</h1>
      {_.map(cows, c => (
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
