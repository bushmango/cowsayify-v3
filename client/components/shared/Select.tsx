import React from 'react'
import styles from './Select.scss'
import { _ } from '@imports/lodash'

export interface ISelectOptions {
  value: string
  display: string
}

const Select = (props: {
  value: string
  options: ISelectOptions[]
  onChange: (newValue) => void
}) => {
  const onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(ev.target.value)
  }

  return (
    <div className={styles.select}>
      <select onChange={onChange} value={props.value || ''}>
        <option key="-" value="">
          (Select one)
        </option>
        {_.map(props.options, c => (
          <option key={c.value} value={c.value}>
            {c.display}
          </option>
        ))}
      </select>
    </div>
  )
}

export { Select }
