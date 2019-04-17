import React from 'react'
import { Checkbox } from './Checkbox'

import { reactTesting } from '@lib/reactTesting'

describe('Checkbox', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(
      <Checkbox value={true} onChange={() => {}} />
    )
  })
})
