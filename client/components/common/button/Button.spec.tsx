import React from 'react'
import { Button } from './Button'

import { reactTesting } from '@lib/reactTesting'

import { render, fireEvent } from 'react-testing-library'

import 'jest-dom/extend-expect'

describe('Button', () => {
  it('renders without crashing', () => {
    reactTesting.rendersWithoutCrashing(<Button />)
  })

  it('can be clicked', () => {
    const onClick = jest.fn()
    const el = render(<Button onClick={onClick}>Click me!</Button>)
    fireEvent.click(el.getByText(/Click me!/i))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
