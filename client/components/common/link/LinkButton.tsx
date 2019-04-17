import React from 'react'
import styles from './Link.scss'

const LinkButton = (props: {
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <div>
      <a
        className={styles.link}
        href='javascript: void(0);'
        onClick={props.onClick}
      >
        {props.children}
      </a>
    </div>
  )
}

export { LinkButton }
