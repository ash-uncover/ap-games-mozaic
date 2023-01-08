import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
// Store
import GameSlice from 'store/game/game.slice'
// Components
import { Dialog } from './commons/Dialog'
// Components
import { DialogAction } from './commons/DialogAction'

import './DialogDefeat.css'

export interface DialogDefeatProperties {
}

export const DialogDefeat = ({
}: DialogDefeatProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const { t } = useTranslation()

  // Events //

  const handleRetry = () => {
    dispatch(GameSlice.actions.endGame())
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
        {t('game.dialogs.defeat.title')}
      </h2>

      <DialogAction
        text={t('game.dialogs.defeat.replay')}
        style={{
          background: 'rgb(22, 160, 134)',
          border: '3px solid rgb(22, 160, 134)',
        }}
        onClick={handleRetry}
      />

      <DialogAction
        text={t('game.dialogs.defeat.quit')}
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