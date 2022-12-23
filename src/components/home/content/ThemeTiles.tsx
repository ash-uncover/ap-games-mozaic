import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AppSelectors from 'store/app/app.selectors'
import AppSlice from 'store/app/app.slice'
// Libs
import CONFIG from 'config'
import { PluginManager } from '@uncover/js-utils-microfrontend'
import { ThemeTile } from './ThemeTile'
// Style
import './ThemeTiles.css'

export interface ThemeTilesProperties {
}

export const ThemeTiles = ({
}: ThemeTilesProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const selectedTheme = useSelector(AppSelectors.theme)

  // Events //

  const handleThemeSelected = (theme?: string) => {
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
      {themes.length > 1 ?
        <ThemeTile
          name='Random'
          description='A Random theme will be selected'
          thumbnail={`${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/images/thumbnail_random.jpg`}
          images={[]}
          selected={!selectedTheme}
          onClick={() => handleThemeSelected()}
        />
        : null}
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
  )
}