import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AppSelectors from 'store/app/app.selectors'
import AppSlice from 'store/app/app.slice'
// Libs
// Components
import {
  Panel,
  Select
} from '@uncover/games-common'

export const HomeContentSettingsGeneral = () => {

  // Hooks //

  const dispatch = useDispatch()
  const language = useSelector(AppSelectors.language)
  const { t } = useTranslation()

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
        <Select
          value={language}
          values={[
            { id: 'fr', text: 'Français' },
            { id: 'en', text: 'English' }
          ]}
          onChange={handleLanguageChange}
        />
      </Panel>
    </>
  )
}