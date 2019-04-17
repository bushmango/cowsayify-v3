import React from 'react'
import { Button } from './Button'

import { reactTesting } from '@lib/reactTesting'

describe('Button', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<Button />)
  })
})
