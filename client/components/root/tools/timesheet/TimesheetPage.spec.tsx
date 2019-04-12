import React from 'react'
import { TimesheetPage } from './TimesheetPage'

import { reactTesting } from '@lib/reactTesting'

describe('TimesheetPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<TimesheetPage />)
  })
})
