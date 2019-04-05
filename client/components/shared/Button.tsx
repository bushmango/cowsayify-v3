import React from 'react'

import styles from './Button.scss'

const Button = (props: {
  type?: 'submit'
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  testId?: string
}) => {
  return (
    <button
      type={props.type}
      className={`${styles.button}`}
      onClick={props.onClick}
      data-t={props.testId}
    >
      {props.children}
    </button>
  )
}

export { Button }
