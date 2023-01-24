import React, { useEffect } from 'react'
// Hooks
import { useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
import Audio, { AudioFiles } from 'lib/utils/Audio'
import { AudioTypes } from '@uncover/games-common'
import { GameStatuses } from 'lib/game/constants'
// Components
import { Navigate } from 'react-router-dom'
import { GameLoading } from './GameLoading'
import { GameReady } from './GameReady'
import { GamePlaying } from './GamePlaying'
import { GameVictory } from './GameVictory'
import { Dialogs } from './dialogs/Dialogs'

import './Game.css'

const Game = ({ }) => {

  // Hooks //

  const status = useSelector(GameSelectors.status)

  useEffect(() => {
    return Audio.play(
      AudioFiles.game,
      AudioTypes.MUSIC
    )
  }, [])

  // Events //

  // Rendering //

  const renderGame = () => {
    switch (status) {
      case GameStatuses.GAME_NOT_STARTED: {
        return <Navigate to='/' />
      }
      case GameStatuses.GAME_LOADING: {
        return <GameLoading />
      }
      case GameStatuses.GAME_READY: {
        return <GameReady />
      }
      case GameStatuses.GAME_ON_GOING: {
        return <GamePlaying />
      }
      case GameStatuses.GAME_ENDED_DEFEAT: {
        return null
      }
      case GameStatuses.GAME_ENDED_VICTORY: {
        return <GameVictory />
      }
      default: {
        return null
      }
    }
  }

  return (
    <>
      {renderGame()}
      <Dialogs />
    </>
  )
}

export default Game