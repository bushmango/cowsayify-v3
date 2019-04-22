import React from 'react'

import DisplayCow from '@components/shared/DisplayCow'
import CowsayOptions from '@components/shared/CowsayOptions'

import Layout from '@components/shared/Layout'

import * as minionCowsay from '@state/minionCowsay'

const Cowsay = (props: any) => {
  return (
    <Layout title='cowsay'>
      <CowsayPage />
    </Layout>
  )
}

const CowsayPage = (props: any) => {
  const cowsay = minionCowsay.useSubscribe()
  let options = minionCowsay.calcOptions()

  return (
    <div>
      <CowsayOptions cowsay={cowsay} />
      <DisplayCow options={options as any} />
    </div>
  )
}

export { Cowsay, CowsayPage }
