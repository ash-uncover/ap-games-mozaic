import React from 'react'

export interface GameLoadingProperties {

}

export const GameLoading = ({

}: GameLoadingProperties) => {

  // Rendering //

  const classes = ['game-loading']

  return (
    <div
      className={classes.join(' ')}
    >

    </div>
  )
}