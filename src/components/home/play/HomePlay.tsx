import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AppSelectors from 'store/app/app.selectors'
import GameSlice from 'store/game/game.slice'
// Libs
import { ArrayUtils } from '@uncover/js-utils'
import { GridTiles, ShortcutManager, Shortcuts } from '@uncover/games-common'
import { PluginManager } from '@uncover/js-utils-microfrontend'
import { GameSize, GameSizes } from 'lib/game/constants'
// Components

import './HomePlay.css'
import GameSelectors from 'store/game/game.selectors'

const HomeNew = () => {

  // Hooks //

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedTheme = useSelector(AppSelectors.theme)
  const size = useSelector(GameSelectors.size)

  useEffect(() => {
    const shortcuts: Shortcuts = {
      id: 'home-new-shortcuts',
      priority: 1,
      shortcuts: [
        { code: 'KeyS', callback: handleStart },
        { code: 'Escape', callback: handleBack },
      ]
    }
    return ShortcutManager.addShortcuts(shortcuts)
  })

  // Events //

  const handleSizeSelected = (gameSize: GameSize) => {
    dispatch(GameSlice.actions.setSize({ size: gameSize }))
  }

  const handleStart = () => {
    const themes = PluginManager.providers['mozaic/theme']
    const theme = selectedTheme ? themes.find(t => t.name === selectedTheme) : ArrayUtils.randomElement(themes)
    let background = null
    if (Array.isArray(theme.attributes.images)) {
      background = ArrayUtils.randomElement(theme.attributes.images)!
    } else {
      background = theme.attributes.images
    }
    dispatch(GameSlice.actions.prepareGame({
      background,
    }))
    navigate('/game')
  }

  const handleBack = () => {
    navigate('/')
  }

  // Rendering //

  return (
    <div className='home-play'>
      <div className='home-play-panel'>
        <h2>New Game</h2>
      </div>
      <div className='home-play-panel'>
        <h3>Board Size</h3>
        <div className='home-play-sizes-container'>
          <GridTiles
            className='home-play-sizes'
            width={6}
            height={6}
          >
            {Object.values(GameSizes).map((gameSize) => {
              const classes = ['home-play-size']
              if (size === gameSize) {
                classes.push('selected')
              }
              if (!gameSize.available) {
                classes.push('disabled')
              }
              return (
                <button
                  key={gameSize.name}
                  className={classes.join(' ')}
                  disabled={!gameSize.available}
                  onClick={() => handleSizeSelected(gameSize)}
                >
                  {gameSize.name}
                </button>
              )
            })}
          </GridTiles>
        </div>
      </div>
      <button
        className='home-play-panel'
        title='New Game'
        onClick={handleStart}
      >
        Start Game
      </button>

    </div>
  )
}

export default HomeNew