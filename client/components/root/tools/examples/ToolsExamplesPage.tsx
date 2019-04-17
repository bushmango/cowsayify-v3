import React from 'react'

import Layout from '@components/shared/Layout'
import { _ } from '@lib/lodash'
import { icons, Icon } from '@components/common/icon/Icon'

const ToolsExamples = () => {
  return (
    <Layout title='Examples'>
      <ToolsExamplesPage />
    </Layout>
  )
}

const ToolsExamplesPage = () => {
  return (
    <div>
      <div>ToolsExamplesPage</div>
      ToolsExamplesPage
      <Icon icon={icons.faArrowRight} />
      Icons
      <Icon icon={icons.faArrowLeft} />
    </div>
  )
}

export { ToolsExamplesPage, ToolsExamples }
