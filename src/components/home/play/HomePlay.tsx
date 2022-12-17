import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSlice from 'store/game/game.slice'
// Libs
import { ArrayUtils } from  '@uncover/js-utils'
import { ShortcutManager, Shortcuts } from '@uncover/games-common'
import AppSelectors from 'store/app/app.selectors'
import { PluginManager } from 'lib/PluginManager'
// Components

const HomeNew = () => {

  // Hooks //

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const themeId = useSelector(AppSelectors.theme)

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

  const handleStart = () => {
    const themes = PluginManager.providers['mozaic/theme']
    const theme = themes.find(t => t.name === themeId)
    let background = null
    if (Array.isArray(theme.attributes.images)) {
      background = ArrayUtils.randomElement(theme.attributes.images)!
    } else {
      background = theme.attributes.images
    }
    const sizeWidth = 4
    const sizeHeight = 3
    dispatch(GameSlice.actions.startGame({
      background,
      sizeWidth,
      sizeHeight
    }))
    navigate('/game')
  }

  const handleBack = () => {
    navigate('/')
  }

  // Rendering //

  return (
    <button
      title='New Game'
      onClick={handleStart}
    >
      Start
    </button>
  )
}

export default HomeNew