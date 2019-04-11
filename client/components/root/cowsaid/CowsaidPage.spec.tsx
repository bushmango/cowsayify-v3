import React from 'react'
import { CowsaidPage } from './CowsaidPage'

import * as reactTesting from '@lib/reactTesting'

describe('CowsaidPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<CowsaidPage data={null} />)
  })
})
