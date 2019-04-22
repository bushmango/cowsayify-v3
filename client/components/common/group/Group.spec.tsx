import React from 'react'
import { Group } from './Group'

import { reactTesting } from '@lib/reactTesting'

describe('Group', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<Group>a group</Group>)
  })
})
