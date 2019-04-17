import React from 'react'
import { Checkbox } from './Checkbox'

import { render, fireEvent } from 'react-testing-library'
import { reactTesting } from '@lib/reactTesting'

describe('Checkbox', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(
      <Checkbox value={true} onChange={() => {}}>
        a button
      </Checkbox>
    )
  })

  it('can be clicked', () => {
    const onClick = jest.fn()
    const el = render(
      <Checkbox value={false} onChange={onClick}>
        Click me!
      </Checkbox>
    )
    fireEvent.click(el.getByText(/Click me!/i))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
