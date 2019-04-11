import React from 'react'
import { TestPage } from './TestPage'

import * as reactTesting from '@lib/reactTesting'

describe('TestPage', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<TestPage />)
  })
})
