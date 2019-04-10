import * as React from 'react'
import { Icon } from './Icon'

import * as reactTesting from '@lib/reactTesting'

describe('Icon', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<Icon />)
    expect(true).toBe(true)
  })
})
