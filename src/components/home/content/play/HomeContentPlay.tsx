import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSlice from 'store/game/game.slice'
import GameSelectors from 'store/game/game.selectors'
// Libs
import { GameSizesPlayable, getSize } from 'lib/game/constants'
// Components
import { ThemeTiles } from '../settings/ThemeTiles'
import {
  Panel,
  PanelButton,
  Select,
  ShortcutManager,
  Shortcuts
} from '@uncover/games-common'

import './HomeContentPlay.css'

export const HomeContentPlay = () => {

  // Hooks //

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
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

  const handleSizeSelected = (sizeId: string) => {
    const newSize = getSize(sizeId)
    dispatch(GameSlice.actions.setSize({ size: newSize }))
  }

  const handleStart = () => {
    dispatch(GameSlice.actions.prepareGame())
    navigate('/game')
  }

  const handleBack = () => {
    navigate('/')
  }

  // Rendering //

  const sizes = GameSizesPlayable.map(size => {
    return {
      id: size.id,
      text: `${size.width} x ${size.height}`
    }
  })

  return (
    <div className='home-play'>

      <div className='home-play__scroll-area'>
        <Panel>
          <h2>
            {t('home.play.title')}
          </h2>
        </Panel>

        <Panel title={t('home.play.size.title')}>
          <Select
            value={size.id}
            values={sizes}
            onChange={handleSizeSelected}
          />
        </Panel>

        <Panel title={t('home.settings.general.theme.title')}>
          <ThemeTiles />
        </Panel>
      </div>

      <PanelButton
        className='home-play__main-action'
        title={t('home.play.start.tooltip')}
        onClick={handleStart}
      >
        {t('home.play.start.text')}
      </PanelButton>
    </div>
  )
}