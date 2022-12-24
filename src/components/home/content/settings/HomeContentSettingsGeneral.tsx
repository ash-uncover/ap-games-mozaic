import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AppSelectors from 'store/app/app.selectors'
import AppSlice from 'store/app/app.slice'
// Libs
// Components
import { Panel } from 'components/common/panel/Panel'
import { MenuSelector } from 'components/common/menu/MenuSelector'
import { ThemeTiles } from './ThemeTiles'

export const HomeContentSettingsGeneral = () => {

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
      <Panel>
        <h2>
          {t('home.settings.general.title')}
        </h2>
      </Panel>

      <Panel title={t('home.settings.general.lang.title')}>
        <MenuSelector
          value={language}
          values={[
            { id: 'fr', text: 'Français' },
            { id: 'en', text: 'English' }
          ]}
          onChange={handleLanguageChange}
        />
      </Panel>

      <Panel title={t('home.settings.general.theme.title')}>
        <ThemeTiles />
      </Panel>

      <Panel title={t('home.settings.general.keys.title')}>
      </Panel>
    </>
  )
}