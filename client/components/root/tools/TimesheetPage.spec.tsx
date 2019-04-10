import React from 'react'
import { TimesheetPage } from './TimesheetPage'

import * as reactTesting from '@lib/reactTesting'

describe('TimesheetPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<TimesheetPage />)
    expect(true).toBe(true)
  })
})
