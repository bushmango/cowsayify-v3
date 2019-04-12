import React from 'react'
import { LocationPage } from './LocationPage'

import { reactTesting } from '@lib/reactTesting'

describe('LocationPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<LocationPage />)
  })
})
