import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSlice from 'store/game/game.slice'
// Libs
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog } from './commons/Dialog'

import './DialogVictory.css'
import AppSelectors from 'store/app/app.selectors'
import GameSelectors from 'store/game/game.selectors'
import { PluginManager } from '@uncover/js-utils-microfrontend'
import { ArrayUtils } from '@uncover/js-utils'
import { DialogAction } from './commons/DialogAction'
import { useTranslation } from 'react-i18next'

export interface DialogVictoryProperties {
}

export const DialogVictory = ({
}: DialogVictoryProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const selectedTheme = useSelector(AppSelectors.theme)
  const background = useSelector(GameSelectors.background)
  const size = useSelector(GameSelectors.size)

  // Events //

  const handleRetry = () => {
    dispatch(GameSlice.actions.endGame())
    dispatch(GameSlice.actions.prepareGame({ background }))
    dispatch(GameSlice.actions.startGame())
    dispatch(GameSlice.actions.closeDialog())
  }

  const handleNextLevel = () => {
    const themes = PluginManager.providers['mozaic/theme']
    let theme = selectedTheme ? themes.find(t => t.name === selectedTheme) : ArrayUtils.randomElement(themes)
    let background = null
    if (Array.isArray(theme.attributes.images)) {
      background = ArrayUtils.randomElement(theme.attributes.images)!
    } else {
      background = theme.attributes.images
    }
    dispatch(GameSlice.actions.endGame())
    dispatch(GameSlice.actions.prepareGame({
      background,
    }))
    dispatch(GameSlice.actions.startGame())
    dispatch(GameSlice.actions.closeDialog())
  }

  const handleEndGame = () => {
    dispatch(GameSlice.actions.endGame())
  }

  const handleClose = () => {
    dispatch(GameSlice.actions.closeDialog())
  }

  // Rendering //

  return (
    <Dialog>

      <h2 className='dialog-title'>
        {t('game.dialogs.victory.title')}
      </h2>

      <DialogAction
        text={t('game.dialogs.victory.replay')}
        style={{
          background: 'rgb(22, 160, 134)',
          border: '3px solid rgb(22, 160, 134)',
        }}
        onClick={handleRetry}
      />

      <DialogAction
        text={t('game.dialogs.victory.next')}
        style={{
          background: 'rgb(22, 160, 134)',
          border: '3px solid rgb(22, 160, 134)',
        }}
        onClick={handleNextLevel}
      />

      <DialogAction
        text={t('game.dialogs.victory.quit')}
        style={{
          background: 'grey',
          border: '3px solid grey',
        }}
        onClick={handleEndGame}
      />

      <DialogAction
        text={t('CLOSE')}
        style={{
          background: 'transparent',
          border: '3px solid grey',
          color: '#222',
        }}
        onClick={handleClose}
      />

    </Dialog>
  )
}