import * as React from 'react'

import styles from './cowsay.scss'
import DisplayCow from '../components/DisplayCow'
import CowsayOptions from '../components/CowsayOptions'
// const styles = require('./cowsay.scss')

import Layout from '../components/Layout'

import * as stateUtil from '../state/stateUtil'
import * as stateCowsay from '../state/stateCowsay'
import { modes, actions } from '../state/stateCowsay'

const CowsayWithHooks = (props: any) => {
  const cowsay = stateUtil.useSubscription(stateCowsay.stateManager)
  let options = stateCowsay.calcOptions()

  return (
    <Layout title="cowsay">
      <CowsayOptions />
      <DisplayCow options={options} />
    </Layout>
  )
}

export default CowsayWithHooks

// class Cowsay extends React.Component<{}> {
//   subscriptionToken = stateCowsay.subscribe(this)
//   componentWillUnmount() {
//     stateCowsay.unSubscribe(this.subscriptionToken)
//   }

//   render() {
//     let state = stateCowsay.getState()
//     let options = stateCowsay.calcOptions()

//     return (
//       <Layout title="cowsay">
//         <CowsayOptions />
//         <DisplayCow options={options} />
//       </Layout>
//     )
//   }
// }

// export default Cowsay
