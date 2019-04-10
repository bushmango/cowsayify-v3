import React from 'react'
import { CowsayPage } from './CowsayPage'

import * as reactTesting from '@lib/reactTesting'

describe('CowsayPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<CowsayPage />)
    expect(true).toBe(true)
  })
})
