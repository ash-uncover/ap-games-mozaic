import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
// Store
import AppSelectors from 'store/app/app.selectors'
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Libs
import Audio, { AudioFiles } from 'lib/utils/Audio'
import { ArrayUtils } from '@uncover/js-utils'
import { AudioTypes } from '@uncover/games-common'
import { GameStatuses } from 'lib/game/constants'
import { PluginManager } from '@uncover/js-utils-microfrontend'
// Components
import { Board } from 'components/game/board/Board'
import { DIALOG, Dialogs } from './dialogs/Dialogs'
import { GameFooterAction } from './GameFooterAction'
import { GameHeader } from './GameHeader'
import { Navigate } from 'react-router-dom'

import './Game.css'

const Game = ({ }) => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [reveal, setReveal] = useState(false)

  const status = useSelector(GameSelectors.status)

  const background = useSelector(GameSelectors.background)

  const selectedTheme = useSelector(AppSelectors.theme)
  const themes = PluginManager.providers['mozaic/theme']
  const theme = selectedTheme ? themes.find(t => t.name === selectedTheme) : ArrayUtils.randomElement(themes)

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

  const handleChangeImage = () => {
    let newBackground = background
    if (Array.isArray(theme.attributes.images) && theme.attributes.images.length > 1) {
      while (newBackground === background) {
        newBackground = ArrayUtils.randomElement(theme.attributes.images)!
      }
    }
    dispatch(GameSlice.actions.changeImage(newBackground))
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
            selected={true}
            title={t('game.start.text')}
            onClick={handleStart}
          />
        )
        if (Array.isArray(theme.attributes.images) && theme.attributes.images.length > 1) {
          result.push(
            <GameFooterAction
              key='change'
              title={t('game.change.text')}
              onClick={handleChangeImage}
            />
          )
        }
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
          reveal={reveal || (status === GameStatuses.GAME_READY) || (status === GameStatuses.GAME_ENDED_VICTORY)}
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