import React from 'react'

import Layout from '@components/shared/Layout'
import { _ } from '@lib/lodash'
import { solidIcons, Icon } from '@components/common/icon/Icon'

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
      <Icon icon={solidIcons.faArrowRight} />
      Icons
      <Icon icon={solidIcons.faArrowLeft} />
    </div>
  )
}

export { ToolsExamplesPage, ToolsExamples }
