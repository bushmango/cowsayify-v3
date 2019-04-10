import * as React from 'react'

import Layout from '../../shared/Layout'
import { _ } from '../../../imports/lodash'
import { icons, Icon } from '@components/common/icon/Icon'

const ToolsExamplesPage = () => {
  return (
    <Layout title="Examples">
      <div>ToolsExamplesPage</div>
      ToolsExamplesPage
      <Icon icon={icons.faArrowRight} />
      Icons
      <Icon icon={icons.faArrowLeft} />
    </Layout>
  )
}

export { ToolsExamplesPage }
