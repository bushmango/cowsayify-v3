import React from 'react'

import styles from './CowsayPage.scss'
import DisplayCow from '../shared/DisplayCow'
import CowsayOptions from '../shared/CowsayOptions'

import Layout from '../shared/Layout'

import * as midboss from 'midboss'
import * as minionCowsay from '../../state/minionCowsay'

const CowsayPage = (props: any) => {
  const cowsay = midboss.useSubscription(minionCowsay.stateManager)
  let options = minionCowsay.calcOptions()

  return (
    <Layout title='cowsay'>
      <CowsayOptions cowsay={cowsay} />
      <DisplayCow options={options as any} />
    </Layout>
  )
}

export { CowsayPage }

// class Cowsay extends React.Component<{}> {
//   subscriptionToken = minionCowsay.subscribe(this)
//   componentWillUnmount() {
//     minionCowsay.unSubscribe(this.subscriptionToken)
//   }

//   render() {
//     let state = minionCowsay.getState()
//     let options = minionCowsay.calcOptions()

//     return (
//       <Layout title="cowsay">
//         <CowsayOptions />
//         <DisplayCow options={options} />
//       </Layout>
//     )
//   }
// }

// export default Cowsay
