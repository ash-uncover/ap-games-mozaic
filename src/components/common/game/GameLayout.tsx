import React, { ReactNode } from 'react'

import './GameLayout.css'

export interface GameLayoutProperties {
  className?: string

  header?: ReactNode
  content: ReactNode
  footer?: ReactNode
}

export const GameLayout = ({
  className,
  header,
  content,
  footer,
}: GameLayoutProperties) => {

  // Hooks //

  // Rendering //

  const classes = ['game-layout']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>

      {header ?
        <div className='game-layout__header'>
          {header}
        </div>
        : null}

      <div className='game-layout__content'>
        {content}
      </div>

      {footer ?
        <div className='game-layout__footer'>
          {footer}
        </div>
        : null}

    </div>
  )
}