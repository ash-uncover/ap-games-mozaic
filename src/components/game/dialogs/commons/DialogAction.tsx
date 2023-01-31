import React, { CSSProperties } from 'react'
// Store
// Libs
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'

import './DialogAction.css'

export interface DialogActionProperties {
  className?: string
  style?: CSSProperties
  icon?: [IconPrefix, IconName]
  text: string
  onClick: () => void
}

export const DialogAction = ({
  className,
  style,
  icon,
  text,
  onClick,
}: DialogActionProperties) => {

  // Hooks //

  // Rendering //

  const classes = ['dialog-action']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>
      <button
        className='dialog-action__button'
        style={style}
        onClick={onClick}
      >
        {icon ?
          <FontAwesomeIcon icon={icon} />
          : null}
        <span>
          {text}
        </span>
      </button>
    </div>
  )
}