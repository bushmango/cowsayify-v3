import React from 'react'

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
  return <FontAwesomeIcon icon={props.icon || faCoffee} />
}

export { Icon }
