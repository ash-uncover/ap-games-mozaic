import React from 'react'
import { useDispatch} from 'react-redux'
import { useTranslation } from 'react-i18next'
// Store
import GameSlice from 'store/game/game.slice'
// Libs
import { DialogAction } from './commons/DialogAction'
// Components
import { Dialog } from './commons/Dialog'

import './DialogVictory.css'

export interface DialogVictoryProperties {
}

export const DialogVictory = ({
}: DialogVictoryProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation()

  // Events //

  const handleRetry = () => {
    dispatch(GameSlice.actions.endGame())
    dispatch(GameSlice.actions.gameStart())
    dispatch(GameSlice.actions.closeDialog())
  }

  const handleNextLevel = () => {
    dispatch(GameSlice.actions.endGame())
    dispatch(GameSlice.actions.gameReady())
    dispatch(GameSlice.actions.gameStart())
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