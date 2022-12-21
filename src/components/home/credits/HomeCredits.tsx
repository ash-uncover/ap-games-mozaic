import React from 'react'
import { useTranslation } from 'react-i18next'

const HomeCredits = () => {

  // Hooks //

  const { t } = useTranslation()

  // Events //

  // Rendering //

  return (
    <h2 style={{ fontWeight: 'normal' }}>
      {t('home.credits.title')}
    </h2>

  )
}

export default HomeCredits