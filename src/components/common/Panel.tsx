import React, { ReactNode } from 'react'
// Styles
import './Panel.css'

export interface PanelProperties {
  title?: string
  children?: ReactNode
}

export const Panel = ({
  title,
  children,
}: PanelProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  return (
    <div className='panel'>
      {title ?
        <h3>
          {title}
        </h3>
        : null}
      {children}
    </div>
  )
}