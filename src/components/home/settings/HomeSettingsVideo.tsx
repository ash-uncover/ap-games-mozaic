import React from 'react'
import { useTranslation } from 'react-i18next'

const HomeSettingsVideo = () => {

  // Hooks //

  const { t } = useTranslation()

  // Events //

  // Rendering //

  return (
    <h2 style={{ fontWeight: 'normal' }}>
      {t('home.settings.video.title')}
    </h2>

  )
}

export default HomeSettingsVideo