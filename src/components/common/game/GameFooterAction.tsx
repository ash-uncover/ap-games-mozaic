import React from 'react'
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'

import './GameFooterAction.css'

export interface GameFooterActionProperties {
  icon?: [IconPrefix, IconName]
  selected?: boolean
  title: string

  onClick: () => void
}

export const GameFooterAction = ({
  icon,
  selected,
  title,

  onClick
}: GameFooterActionProperties) => {

  // Rendering //

  const classes = ['game-footer-action']
  if (selected) {
    classes.push('selected')
  }

  return (
    <button
      className={classes.join(' ')}
      title={title}
      onClick={onClick}
      style={{
        padding: icon ? undefined : '0.5rem 1rem'
      }}
    >
      {icon ?
        <FontAwesomeIcon icon={icon} />
        :
        title
      }
    </button>
  )
}