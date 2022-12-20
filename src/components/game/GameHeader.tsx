import React from 'react'
import { useSelector } from 'react-redux'
// Store
import AppSelectors from 'store/app/app.selectors'
import GameSelectors from 'store/game/game.selectors'
// Libs
import { PluginManager } from '@uncover/js-utils-microfrontend'
// Components

import './GameHeader.css'

export interface GameHeader {
}

export const GameHeader = ({
}: GameHeader) => {

  // Hooks //

  const selectedTheme = useSelector(AppSelectors.theme)
  const theme = PluginManager.getProviders('mozaic/theme').find(t => t.name === selectedTheme)
  const size = useSelector(GameSelectors.size)

  // Rendering //

  return (
    <div className='game-header'>
      <div>
        {`${theme.attributes.name} - ${size.height}*${size.width}`}
      </div>
    </div>
  )
}