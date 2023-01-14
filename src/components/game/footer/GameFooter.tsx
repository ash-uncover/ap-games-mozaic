import React, { CSSProperties, ReactNode } from 'react'

import './GameFooter.css'

export interface GameFooterProperties {
  className?: string
  style?: CSSProperties

  children: ReactNode
}

export const GameFooter = ({
  className,
  style,
  children
}: GameFooterProperties) => {

  // Rendering //

  const classes = ['game-footer']
  if (className) {
    classes.push(className)
  }

  return (
    <div
      className={classes.join(' ')}
      style={style}
    >
      {children}
    </div>
  )
}