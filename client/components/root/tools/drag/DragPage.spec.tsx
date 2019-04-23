import React from 'react'
import { DragPage } from './DragPage'

import { reactTesting } from '@lib/reactTesting'

describe('DragPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<DragPage />)
  })
})
