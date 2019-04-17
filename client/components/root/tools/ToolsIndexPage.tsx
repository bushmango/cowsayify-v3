import React from 'react'

import Layout from '@components/shared/Layout'
import { _ } from '@lib/lodash'

const ToolsIndex = () => {
  return (
    <Layout title='Tools'>
      <ToolsIndexPage />
    </Layout>
  )
}

const ToolsIndexPage = () => {
  return (
    <div>
      <div>ToolsIndexPage</div>
      ToolsIndexPage
    </div>
  )
}

export { ToolsIndex, ToolsIndexPage }
