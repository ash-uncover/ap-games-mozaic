import React from 'react'
import { useTranslation } from 'react-i18next'
// Libs
// Components
import { ThemeTiles } from './general/ThemeTiles'

const HomeSettingsGeneral = () => {

  // Hooks //

  const { t } = useTranslation()

  // Events //

  // Rendering //

  return (
    <>
      <h2 style={{ fontWeight: 'normal' }}>
        General Settings
      </h2>

      <h3 style={{ fontWeight: 'normal' }}>
        Language
      </h3>

      <ThemeTiles />

      <h3 style={{ fontWeight: 'normal' }}>
        Key bindings
      </h3>
    </>
  )
}

export default HomeSettingsGeneral