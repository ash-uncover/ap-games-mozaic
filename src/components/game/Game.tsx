import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Libs
import Audio, { AudioFiles } from 'lib/utils/Audio'
import { AudioTypes } from '@uncover/games-common'
import { GameStatuses } from 'lib/game/constants'
// Components
import { Navigate } from 'react-router-dom'
import { Board } from 'components/game/board/Board'
import { DIALOG, Dialogs } from './dialogs/Dialogs'
import { GameFooterAction } from './GameFooterAction'
import { GameHeader } from './GameHeader'

import './Game.css'

const Game = ({ }) => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [reveal, setReveal] = useState(false)

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
            title={t('game.start.text')}
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

      <div className='game-area'>
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