import React from 'react'
import { useTranslation } from 'react-i18next'
// Libs
import { PluginManager } from 'lib/PluginManager'

const HomeSettingsGeneral = () => {

  // Hooks //

  const { t } = useTranslation()

  // Events //

  // Rendering //

  const renderThemes = () => {
    const themes = PluginManager.providers['mozaic/theme']
    console.log(themes)
    if (!themes || !themes.length) {
      return null
    }
    return (
      <>
        <h3 style={{ fontWeight: 'normal' }}>
          Theme
        </h3>
        <div>
          {themes.map(renderTheme)}
        </div>
      </>
    )
  }

  const renderTheme = (theme: any, indexTheme: number) => {
    const {
      name,
      description,
      thumbnail,
      background,
      images
    } = theme.attributes
    return (
      <div>
        <img
          src={thumbnail || background || images.length ? images[0] : null}
        />
        <div>
          {name}
        </div>
      </div>
    )
  }

  return (
    <>
      <h2 style={{ fontWeight: 'normal' }}>
        General Settings
      </h2>
      <h3 style={{ fontWeight: 'normal' }}>
        Language
      </h3>
      {renderThemes()}
      <h3 style={{ fontWeight: 'normal' }}>
        Key bindings
      </h3>
    </>
  )
}

export default HomeSettingsGeneral