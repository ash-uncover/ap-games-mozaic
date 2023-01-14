import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AppSelectors from 'store/app/app.selectors'
import AppSlice from 'store/app/app.slice'
// Libs
import CONFIG from 'config'
import { resolveThumbnail } from 'lib/utils/theme'
// Components
import { Tile } from 'components/common/tiles/Tile'
// Style
import './ThemeTiles.css'
import { useProviders } from '@uncover/ward-react'

export interface ThemeTilesProperties {
}

export const ThemeTiles = ({
}: ThemeTilesProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const themes = useProviders('mozaic/theme')
  const selectedTheme = useSelector(AppSelectors.theme)

  // Events //

  const handleThemeSelected = (themeId?: string) => {
    dispatch(AppSlice.actions.setTheme(themeId))
  }

  // Rendering //

  if (!themes || !themes.length) {
    return null
  }

  const classes = ['theme-tiles']

  return (
    <div
      className={classes.join(' ')}
    >
      {themes.length > 1 ?
        <Tile
          name='Random'
          title='A Random theme will be selected'
          image={`${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/images/thumbnail_random.jpg`}
          className={!selectedTheme ? 'selected' : undefined}
          onClick={() => handleThemeSelected()}
        />
        : null}
      {themes.sort((theme1, theme2) => theme1.name.localeCompare(theme2.name)).map((theme) => {
        const {
          name,
          description,
          thumbnail,
          background,
          images,
        } = theme.attributes
        return (
          <Tile
            key={`theme-${name}`}
            className={selectedTheme === theme.name ? 'selected' : ''}
            name={name}
            title={description}
            image={resolveThumbnail({name, description, thumbnail, background, images })}
            onClick={() => handleThemeSelected(theme.name)}
          />
        )
      })}
    </div>
  )
}