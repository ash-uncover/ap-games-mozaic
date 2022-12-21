import React, { CSSProperties } from 'react'
// Store
// Libs
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'

import './DialogAction.css'

export interface DialogActionProperties {
  icon?: [IconPrefix, IconName]
  style?: CSSProperties
  text: string
  onClick: () => void
}

export const DialogAction = ({
  icon,
  style,
  text,
  onClick,
}: DialogActionProperties) => {

  // Hooks //

  // Rendering //

  return (
    <div className='dialog-action'>
      <button
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