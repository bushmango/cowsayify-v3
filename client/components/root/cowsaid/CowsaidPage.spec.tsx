import React from 'react'
import { CowsaidPage } from './CowsaidPage'

import { reactTesting } from '@lib/reactTesting'

describe('CowsaidPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<CowsaidPage data={null} />)
  })
})
