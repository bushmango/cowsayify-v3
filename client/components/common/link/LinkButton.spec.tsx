import React from 'react'
import { LinkButton } from './LinkButton'

import { reactTesting } from '@lib/reactTesting'
import { render, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'

describe('LinkButton', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(
      <LinkButton onClick={() => {}}>a link</LinkButton>
    )
  })

  it('can be clicked', () => {
    const onClick = jest.fn()
    const el = render(<LinkButton onClick={onClick}>Click me!</LinkButton>)
    fireEvent.click(el.getByText(/Click me!/i))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
