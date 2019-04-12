import React from 'react'
import { CowsayPage } from './CowsayPage'

import { reactTesting } from '@lib/reactTesting'

describe('CowsayPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<CowsayPage />)
  })
})
