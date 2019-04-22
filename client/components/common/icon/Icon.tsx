import React from 'react'
import { isServer } from '@lib/isServer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

import { regularIcons } from './regularIcons'
import { solidIcons } from './solidIcons'

export { regularIcons, solidIcons }

const Icon = (props: { icon?: IconDefinition }) => {
  if (isServer()) {
    return (
      <div
        style={{
          display: 'inline-block',
          width: '14px',
          height: '16px',
          textAlign: 'center',
        }}
      >
        -
      </div>
    )
  }

  return <FontAwesomeIcon icon={props.icon || solidIcons.faCoffee} />
}

export { Icon }
