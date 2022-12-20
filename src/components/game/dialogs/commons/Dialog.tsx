import React, { ReactNode } from 'react'
// Store
// Libs
// Components

import './Dialog.css'

export interface DialogProperties {
  children: ReactNode
}

export const Dialog = ({
  children
}: DialogProperties) => {

  // Hooks //

  // Rendering //

  return (
    <div className='dialog-container'>
      <div className='dialog'>
        {children}
      </div>
    </div>
  )
}