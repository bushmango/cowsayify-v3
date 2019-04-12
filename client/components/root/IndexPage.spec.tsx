import React from 'react'
import { IndexPage } from './IndexPage'

import { reactTesting } from '@lib/reactTesting'

describe('IndexPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<IndexPage />)
  })
})
