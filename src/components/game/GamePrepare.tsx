import React from 'react'

export interface GamePrepareProperties {

}

export const GamePrepare = ({

}: GamePrepareProperties) => {

  // Rendering //

  const classes = ['game-area game-prepare']

  return (
    <div
      className={classes.join(' ')}
    >

    </div>
  )
}