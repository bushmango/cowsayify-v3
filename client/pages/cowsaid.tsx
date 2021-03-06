import styles from './cowsay.scss'

import * as React from 'react'

import Layout from '../components/Layout'

import DisplayCow from '../components/DisplayCow'

import * as stateCowsay from '../state/stateCowsay'

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
    <Layout title="cowsaid">
      <DisplayCow options={options} />
    </Layout>
  )
}

CowsaidPage.getInitialProps = async ({ query }) => {
  const { key } = query
  return await stateCowsay.fetchCow(key)
}

export default CowsaidPage
