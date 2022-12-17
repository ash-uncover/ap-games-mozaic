import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Libs
import Audio, { AudioFiles } from 'lib/utils/Audio'
import { GameStatuses } from 'lib/game/constants'
// Components
import Board from 'components/game/board/Board'
// Libs
import { AudioTypes } from '@uncover/games-common'

import './Game.css'

const Game = ({ }) => {

  // Hooks //

  const dispatch = useDispatch()

  const status = useSelector(GameSelectors.status)

  const clicks = useSelector(GameSelectors.clicks)

  useEffect(() => {
    return Audio.play(
      AudioFiles.game,
      AudioTypes.MUSIC
    )
  }, [])

  // Events //

  const handleEndGame = () => {
    dispatch(GameSlice.actions.endGame())
  }

  // Rendering //

  if (status === GameStatuses.GAME_NOT_STARTED) {
    return (
      <Navigate to='/' />
    )
  }

  return (
    <div className='game'>
      <div className='game-header'>
        {`Clicks: ${clicks}`}
      </div>
      <div
        className='game-area'
        style={{ position: 'relative' }}
      >
        <Board />
      </div>
      <div className='game-footer'>
        footer
      </div>
      {status === GameStatuses.GAME_ENDED_VICTORY ?
        <div className='game-layer'>
          <div className='game-dialog'>
            VICTORY
            <button
              onClick={handleEndGame}
            >
              Return to Main Menu
            </button>
          </div>
        </div>
        : null}
    </div>
  )
}

export default Game