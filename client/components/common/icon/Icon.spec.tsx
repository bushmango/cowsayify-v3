import React from 'react'
import { Icon } from './Icon'

import { reactTesting } from '@lib/reactTesting'

describe('Icon', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<Icon />)
  })
})
