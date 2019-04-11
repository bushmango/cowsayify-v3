import React from 'react'
import { HistoryPage } from './HistoryPage'

import * as reactTesting from '@lib/reactTesting'

describe('HistoryPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(
      <HistoryPage fromServer={false} serverStateHistory={null} />
    )
  })
})
