import React from 'react'
// Hooks
import { useSelector } from 'react-redux'
import { useWardProviders } from '@uncover/ward-react'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
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

  const theme = useSelector(GameSelectors.theme)

  const themes = useWardProviders('mozaic/theme')

  let audios = []
  let images = []
  if (theme) {
    const themeObj = themes.find(t => t.name === theme)
    images = themeObj.attributes.images
    audios = themeObj.attributes.music
  } else {
    [images, audios] = themes.reduce((acc, theme) => {
      acc[0].push(...theme.attributes.images)
      acc[1].push(...theme.attributes.music)
      return acc
    }, [[], []])
  }

  // Events //

  // Rendering //

  const renderGame = () => {
    switch (status) {
      case GameStatuses.GAME_NOT_STARTED: {
        return <Navigate to='/' />
      }
      case GameStatuses.GAME_LOADING: {
        return (
          <GameLoading
            images={images}
            audios={audios}
          />
        )
      }
      case GameStatuses.GAME_READY: {
        return <GameReady />
      }
      case GameStatuses.GAME_ON_GOING: {
        return (
          <GamePlaying
            audios={audios}
          />
        )
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