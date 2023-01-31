import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useTranslation } from 'react-i18next'
// Store
import GameSlice from 'store/game/game.slice'
// Libs
import { DialogAction } from './commons/DialogAction'
// Components
import { Dialog } from './commons/Dialog'

import './DialogVictory.css'
import GameSelectors from 'store/game/game.selectors'

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
    dispatch(GameSlice.actions.gameReady())
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
        className='selected'
        onClick={handleRetry}
      />

      <DialogAction
        text={t('game.dialogs.victory.quit')}
        onClick={handleEndGame}
      />

      <DialogAction
        text={t('game.dialogs.victory.continue')}
        onClick={handleClose}
      />

    </Dialog>
  )
}