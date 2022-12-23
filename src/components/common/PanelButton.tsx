import React, { ReactNode } from 'react'
// Styles
import './Panel.css'

export interface PanelButtonProperties {
  className?: string
  title?: string
  children: ReactNode

  onClick: () => void
}

export const PanelButton = ({
  className,
  title,
  children,

  onClick
}: PanelButtonProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes= ['panel panel-button']
  if (className) {
    classes.push(className)
  }

  return (
    <button
      className={classes.join(' ')}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  )
}