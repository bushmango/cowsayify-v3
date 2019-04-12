import React from 'react'
import { NewsPage } from './NewsPage'

import { reactTesting } from '@lib/reactTesting'

describe('NewsPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<NewsPage />)
  })
})
