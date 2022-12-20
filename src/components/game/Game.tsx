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
import { Board } from 'components/game/board/Board'
// Libs
import { AudioTypes } from '@uncover/games-common'

import './Game.css'
import { GameFooterAction } from './GameFooterAction'
import { GameHeader } from './GameHeader'
import { DIALOG, Dialogs } from './dialogs/Dialogs'

const Game = ({ }) => {

  // Hooks //

  const dispatch = useDispatch()

  const [reveal, setReveal] = useState(false)
  const [showEndConfirm, setShowEndConfirm] = useState(false)

  const status = useSelector(GameSelectors.status)

  const clicks = useSelector(GameSelectors.clicks)

  useEffect(() => {
    return Audio.play(
      AudioFiles.game,
      AudioTypes.MUSIC
    )
  }, [])

  // Events //

  const handleStart = () => {
    dispatch(GameSlice.actions.startGame())
  }

  const handleToggleView = () => {
    setReveal(!reveal)
  }

  const handleEndMenu = () => {
    dispatch(GameSlice.actions.openDialog({ dialog: DIALOG.DEFEAT }))
  }

  const handleVictoryMenu = () => {
    dispatch(GameSlice.actions.openDialog({ dialog: DIALOG.VICTORY }))
  }

  // Rendering //

  if (status === GameStatuses.GAME_NOT_STARTED) {
    return (
      <Navigate to='/' />
    )
  }

  const buildFooterActions = () => {
    const result = []
    switch (status) {
      case GameStatuses.GAME_READY: {
        result.push(
          <GameFooterAction
            key='start'
            title='Start Game'
            onClick={handleStart}
          />
        )
        break
      }
      case GameStatuses.GAME_ON_GOING: {
        result.push(
          <GameFooterAction
            key='reveal'
            icon={['fas', 'eye']}
            selected={reveal}
            title=''
            onClick={handleToggleView}
          />
        )
        result.push(
          <GameFooterAction
            key='quit'
            icon={['fas', 'door-open']}
            title=''
            onClick={handleEndMenu}
          />
        )
        break
      }
      case GameStatuses.GAME_ENDED_VICTORY: {
        result.push(
          <GameFooterAction
            key='victory'
            icon={['fas', 'door-open']}
            title=''
            onClick={handleVictoryMenu}
          />
        )
        break
      }
    }
    return result;
  }

  return (
    <div className='game'>

      <GameHeader />

      <div
        className='game-area'
        style={{ position: 'relative' }}
      >
        <Board
          reveal={reveal || (status === GameStatuses.GAME_READY)  || (status === GameStatuses.GAME_ENDED_VICTORY)}
        />
      </div>

      <div className='game-footer'>
        {buildFooterActions()}
      </div>

      <Dialogs />
    </div>
  )
}

export default Game