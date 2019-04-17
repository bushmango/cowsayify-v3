import React from 'react'
import styles from './Checkbox.scss'
import { _ } from '@lib/lodash'

import commonStyles from '@theme/common.scss'

let sequenceName = 1

const Checkbox = (props: {
  label: string | React.ReactNode
  value: boolean
  onChange: (newValue: boolean) => void
  testId?: string
}) => {
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(ev.target.checked)
  }

  sequenceName++
  let name = 'checkbox_' + sequenceName

  return (
    <div className={`${styles.checkbox} ${commonStyles.noTextSelect}`}>
      <input
        className={commonStyles.clickable}
        type='checkbox'
        id={name}
        name={name}
        checked={props.value ? true : undefined}
        onChange={onChange}
        data-t={props.testId}
      />
      <label className={commonStyles.clickable} htmlFor={name}>
        {props.label}
      </label>
    </div>
  )
}

export { Checkbox }
