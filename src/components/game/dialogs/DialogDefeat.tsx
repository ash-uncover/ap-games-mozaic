import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSlice from 'store/game/game.slice'
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog } from './commons/Dialog'

import './DialogDefeat.css'
import GameSelectors from 'store/game/game.selectors'
import { PluginManager } from '@uncover/js-utils-microfrontend'
import AppSelectors from 'store/app/app.selectors'
import { ArrayUtils } from '@uncover/js-utils'
import { DialogAction } from './commons/DialogAction'

export interface DialogDefeatProperties {
}

export const DialogDefeat = ({
}: DialogDefeatProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const selectedTheme = useSelector(AppSelectors.theme)
  const background = useSelector(GameSelectors.background)
  const size = useSelector(GameSelectors.size)

  // Events //

  const handleRetry = () => {
    dispatch(GameSlice.actions.prepareGame({ background }))
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
        Menu
      </h2>

      <DialogAction
        text='Replay'
        style={{
          background: 'rgb(22, 160, 134)',
          border: '3px solid rgb(22, 160, 134)',
        }}
        onClick={handleRetry}
      />

      <DialogAction
        text='Return to Main Menu'
        style={{
          background: 'grey',
          border: '3px solid grey',
        }}
        onClick={handleEndGame}
      />

      <DialogAction
        text='Close'
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