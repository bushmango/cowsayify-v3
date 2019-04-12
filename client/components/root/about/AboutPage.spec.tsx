import React from 'react'
import { AboutPage } from './AboutPage'

import { reactTesting } from '@lib/reactTesting'

describe('AboutPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<AboutPage />)
  })
})
