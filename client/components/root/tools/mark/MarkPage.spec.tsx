import React from 'react'
import { MarkPage } from './MarkPage'

import { reactTesting } from '@lib/reactTesting'

describe('MarkPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<MarkPage />)
  })
})
