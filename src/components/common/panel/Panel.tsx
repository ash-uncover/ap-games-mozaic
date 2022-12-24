import React, { ReactNode } from 'react'
// Styles
import './Panel.css'

export interface PanelProperties {
  className?: string
  title?: string
  children?: ReactNode
}

export const Panel = ({
  className,
  title,
  children,
}: PanelProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes = ['panel']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>
      {title ?
        <h3>
          {title}
        </h3>
        : null}
      {children}
    </div>
  )
}