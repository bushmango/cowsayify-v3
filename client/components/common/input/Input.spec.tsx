import React from 'react'
import { Input } from './Input'

import { reactTesting } from '@lib/reactTesting'

describe('Input', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(
      <Input onChange={() => {}} value='1234' />
    )
  })
})
