import React, { ReactNode, ReactElement } from 'react'
import ReactDOM from 'react-dom'

// export type ReactFunctionComponent<T> = (props: T) => JSX.Element

export function rendersWithoutCrashing(Component: ReactElement) {
  const div = document.createElement('div')
  ReactDOM.render(Component, div)
  ReactDOM.unmountComponentAtNode(div)
}
