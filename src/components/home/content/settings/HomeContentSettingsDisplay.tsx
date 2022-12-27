import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// Store
import DisplaySelectors from 'store/display/display.selectors'
import DisplaySlice from 'store/display/display.slice'
// Components
import {
  Panel,
  Slider
} from '@uncover/games-common'

export const HomeContentSettingsDisplay = () => {

  // Hooks //

  const dispatch = useDispatch()

  const { t } = useTranslation()

  const brightness = useSelector(DisplaySelectors.brightness)
  const contrast = useSelector(DisplaySelectors.contrast)

  // Events //

  const handleBrightnessChange = (value: number) => {
    dispatch(DisplaySlice.actions.setBrightness(value))
  }

  const handleContrastChange = (value: number) => {
    dispatch(DisplaySlice.actions.setContrast(value))
  }

  // Rendering //

  return (
    <>
      <Panel>
        <h2>
          {t('home.settings.display.title')}
        </h2>
      </Panel>

      <Panel title={t('home.settings.display.brightness.title')}>
        <Slider
          label={t('home.settings.display.brightness.title')}
          min={0}
          max={100}
          value={brightness}
          onChange={handleBrightnessChange}
        />
      </Panel>

      <Panel title={t('home.settings.display.contrast.title')}>
        <Slider
          label={t('home.settings.display.contrast.title')}
          min={0}
          max={100}
          value={contrast}
          onChange={handleContrastChange}
        />
      </Panel>
    </>
  )
}