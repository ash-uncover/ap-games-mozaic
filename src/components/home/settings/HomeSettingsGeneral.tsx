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
        {t('home.settings.general.title')}
      </h2>

      <h3 style={{ fontWeight: 'normal' }}>
        {t('home.settings.general.lang.title')}
      </h3>

      <ThemeTiles />

      <h3 style={{ fontWeight: 'normal' }}>
        {t('home.settings.general.keys.title')}
      </h3>
    </>
  )
}

export default HomeSettingsGeneral