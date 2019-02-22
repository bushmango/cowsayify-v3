import * as React from 'react'
const { useState, useEffect } = React

import styles from './cowsay.scss'
import DisplayCow from '../components/DisplayCow'
import CowsayOptions from '../components/CowsayOptions'
// const styles = require('./cowsay.scss')

import Layout from '../components/Layout'

import * as stateCowsay from '../state/stateCowsay'
import { modes, actions } from '../state/stateCowsay'

function useSubscriptionHook(key) {
  const [state, setState] = useState(stateCowsay.getState())

  function handleStatusChange(status) {
    setState(status)
  }

  useEffect(() => {
    let subscriptionToken = stateCowsay.subscribeHook(handleStatusChange)
    return () => {
      stateCowsay.unSubscribe(subscriptionToken)
    }
  })

  return state
}

0
const CowsayWithHooks = (props: any) => {
  // const cowsay = useSubscriptionHook('cowsay')
  let options = stateCowsay.calcOptions()

  return (
    <Layout title="cowsay">
      {/* {cowsay.text} */}
      <CowsayOptions />
      <DisplayCow options={options} />
    </Layout>
  )
}

class Cowsay extends React.Component<{}> {
  subscriptionToken = stateCowsay.subscribe(this)
  componentWillUnmount() {
    stateCowsay.unSubscribe(this.subscriptionToken)
  }

  render() {
    let state = stateCowsay.getState()
    let options = stateCowsay.calcOptions()

    return (
      <Layout title="cowsay">
        <CowsayWithHooks />

        <CowsayOptions />

        <DisplayCow options={options} />
      </Layout>
    )
  }
}

export default CowsayWithHooks
