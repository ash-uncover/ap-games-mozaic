import React from 'react'
import { useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
// Components
import { DialogVictory } from './DialogVictory'
import { DialogDefeat } from './DialogDefeat'

export const DIALOG = {
  VICTORY: 'VICTORY',
  DEFEAT: 'DEFEAT',
}

export interface DialogsProperties {
}

export const Dialogs = ({
}: DialogsProperties) => {

  // Hooks //

  const dialog = useSelector(GameSelectors.dialog)

  // Rendering //

  switch (dialog) {
    case DIALOG.VICTORY: return <DialogVictory />
    case DIALOG.DEFEAT: return <DialogDefeat />
    default: return null
  }
}