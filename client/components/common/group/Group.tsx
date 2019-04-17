import React from 'react'
import styles from './Group.scss'

const Group = (props: { children?: React.ReactNode }) => {
  return <div className={`${styles.group}`}>{props.children}</div>
}

export { Group }
