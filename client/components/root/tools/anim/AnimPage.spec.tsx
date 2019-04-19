import React from 'react'
import { AnimPage } from './AnimPage'

import { reactTesting } from '@lib/reactTesting'

describe('AnimPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<AnimPage />)
  })
})
