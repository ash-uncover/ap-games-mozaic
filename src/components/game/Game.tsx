import React from 'react'
// Hooks
import { useSelector } from 'react-redux'
import { useAudioEffect, AudioCategories } from '@uncover/games-common-audio'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
import CONFIG from 'config'
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

  useAudioEffect([
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/game.mp3`
  ], {
    category: AudioCategories.MUSIC
  })

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