import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AppSelectors from 'store/app/app.selectors'

import './ThemeTiles.css'
import { PluginManager } from '@uncover/js-utils-microfrontend'
import AppSlice from 'store/app/app.slice'
import { ThemeTile } from './ThemeTile'

export interface ThemeTilesProperties {
}

export const ThemeTiles = ({
}: ThemeTilesProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const selectedTheme = useSelector(AppSelectors.theme)

  // Events //

  const handleThemeSelected = (theme: string) => {
    dispatch(AppSlice.actions.setTheme(theme))
  }

  // Rendering //

  const themes = PluginManager.providers['mozaic/theme']
  if (!themes || !themes.length) {
    return null
  }

  const classes = ['theme-tiles']

  return (
    <div
      className={classes.join(' ')}
    >
      <h3 style={{ fontWeight: 'normal' }}>
        Theme
      </h3>
      <div
        className='theme-tiles-container'
      >
        {themes.map((theme) => {
          const {
            name,
            description,
            thumbnail,
            background,
            images,
          } = theme.attributes
          return (
            <ThemeTile
              key={`theme-${name}`}
              name={name}
              description={description}
              thumbnail={thumbnail}
              background={background}
              images={images}
              selected={selectedTheme === theme.name}
              onClick={() => handleThemeSelected(theme.name)}
            />
          )
        })}
      </div>
    </div>
  )
}