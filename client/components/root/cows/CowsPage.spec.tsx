import React from 'react'
import { CowsPage } from './CowsPage'

import * as reactTesting from '@lib/reactTesting'

describe('CowsPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<CowsPage />)
  })
})
