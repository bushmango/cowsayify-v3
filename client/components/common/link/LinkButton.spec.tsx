import React from 'react'
import { LinkButton } from './LinkButton'

import { reactTesting } from 'lib/reactTesting'

describe('LinkButton', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(
      <LinkButton onClick={() => {}}>a link</LinkButton>
    )
  })
})
