import React, { ReactNode, ReactElement } from 'react'
import ReactDOM from 'react-dom'

// export type ReactFunctionComponent<T> = (props: T) => JSX.Element

let isTesting = false
function setTesting() {
  isTesting = true
}
function isInTesting() {
  return isTesting
}

function rendersWithoutCrashing(Component: ReactElement) {
  setTesting()
  const div = document.createElement('div')
  ReactDOM.render(Component, div)
  ReactDOM.unmountComponentAtNode(div)
}

const reactTesting = {
  setTesting,
  isInTesting,
  rendersWithoutCrashing,
}

export { reactTesting }
