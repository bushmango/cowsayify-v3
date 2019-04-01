import * as React from 'react'

import styles from './cowsay.scss'
import DisplayCow from '../shared/DisplayCow'
import CowsayOptions from '../shared/CowsayOptions'

import Layout from '../shared/Layout'

import * as midboss from 'midboss'
import * as stateCowsay from '../../state/stateCowsay'

const CowsayPage = (props: any) => {
  const cowsay = midboss.useSubscription(stateCowsay.stateManager)
  let options = stateCowsay.calcOptions()

  return (
    <Layout title="cowsay">
      <CowsayOptions cowsay={cowsay} />
      <DisplayCow options={options as any} />
    </Layout>
  )
}

export { CowsayPage }

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
