import React from 'react'
import { useTranslation } from 'react-i18next'
// Store
import AppSelectors from 'store/app/app.selectors'
import AppSlice from 'store/app/app.slice'
// Libs
// Components
import { ThemeTiles } from './ThemeTiles'
import { MenuSelector } from './MenuSelector'
import { useDispatch, useSelector } from 'react-redux'

export const HomeSettingsGeneral = () => {

  // Hooks //

  const dispatch = useDispatch()
  const language = useSelector(AppSelectors.language)
  const { t, i18n } = useTranslation()

  // Events //

  const handleLanguageChange = (lang) => {
    dispatch(AppSlice.actions.setLanguage(lang))
  }

  // Rendering //

  return (
    <>
      <h2 style={{ fontWeight: 'normal' }}>
        {t('home.settings.general.title')}
      </h2>

      <h3 style={{ fontWeight: 'normal' }}>
        {t('home.settings.general.lang.title')}
      </h3>

      <MenuSelector
        value={language}
        values={[
          { id: 'fr', text: 'Français' },
          { id: 'en', text: 'English' }
        ]}
        onChange={handleLanguageChange}
      />

      <ThemeTiles />

      <h3 style={{ fontWeight: 'normal' }}>
        {t('home.settings.general.keys.title')}
      </h3>
    </>
  )
}