import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AppSelectors from 'store/app/app.selectors'
import GameSlice from 'store/game/game.slice'
import GameSelectors from 'store/game/game.selectors'
// Libs
import { ArrayUtils } from '@uncover/js-utils'
import { GameSize, GameSizes } from 'lib/game/constants'
import { GridTiles, ShortcutManager, Shortcuts } from '@uncover/games-common'
import { PluginManager } from '@uncover/js-utils-microfrontend'
import { Panel } from 'components/common/panel/Panel'
import { PanelButton } from 'components/common/panel/PanelButton'
// Components

import './HomeContentPlay.css'

export const HomeContentPlay = () => {

  // Hooks //

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
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
      <Panel>
        <h2>
        {t('home.play.title')}
        </h2>
      </Panel>

      <Panel title={t('home.play.size.title')}>
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
      </Panel>

      <PanelButton
        title={t('home.play.start.tooltip')}
        onClick={handleStart}
      >
        {t('home.play.start.text')}
      </PanelButton>
    </div>
  )
}