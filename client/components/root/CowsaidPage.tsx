import React from 'react'

import Layout from '../shared/Layout'

import DisplayCow from '../shared/DisplayCow'

import * as minionCowsay from '../../state/minionCowsay'

function CowsaidPage(props: { data: any }) {
  let { data } = props
  let { key, text, options } = data

  if (!text || text.length === 0) {
    text = 'Moo'
  }

  if (data.error || !options) {
    text = '404 cow not found!'
    options = { d: true }
    options.text = text
  } else {
    options = JSON.parse(options || {})
    options.text = text
  }

  return (
    <Layout title='cowsaid'>
      <DisplayCow options={options} />
    </Layout>
  )
}

CowsaidPage.getInitialProps = async ({ query }) => {
  const { key } = query
  return await minionCowsay.fetchCow(key)
}

export { CowsaidPage }
