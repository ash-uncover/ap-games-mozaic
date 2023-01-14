import React from 'react'
import { useSelector } from 'react-redux'
import { useProvider } from '@uncover/ward-react'
// Store
import AppSelectors from 'store/app/app.selectors'
import GameSelectors from 'store/game/game.selectors'
// Libs
// Components

import './GameHeader.css'

export interface GameHeader {
}

export const GameHeader = ({
}: GameHeader) => {

  // Hooks //

  const selectedTheme = useSelector(AppSelectors.theme)
  const theme = useProvider(`mozaic/theme/${selectedTheme}`)
  const size = useSelector(GameSelectors.size)

  // Rendering //

  return (
    <div className='game-header'>
     {theme ? theme.attributes.name : 'Random'} - {size.height}x{size.width}
    </div>
  )
}