import React from 'react'
import { isServer } from 'lib/isServer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import {
  faCoffee,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

const icons = { faCoffee, faArrowRight, faArrowLeft }
export { icons }

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

  return <FontAwesomeIcon icon={props.icon || faCoffee} />
}

export { Icon }
