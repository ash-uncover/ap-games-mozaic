import { MenuStepInput } from '@uncover/games-common'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import DisplaySelectors from 'store/display/display.selectors'
import DisplaySlice from 'store/display/display.slice'

export const HomeSettingsDisplay = () => {

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
      <h2 style={{ fontWeight: 'normal' }}>
        {t('home.settings.display.title')}
      </h2>

      <h3 style={{ fontWeight: 'normal' }}>
        {t('home.settings.display.brightness.title')}
      </h3>

      <MenuStepInput
        label={t('home.settings.display.brightness.title')}
        min={0}
        max={100}
        value={brightness}
        onChange={handleBrightnessChange}
      />

      <h3 style={{ fontWeight: 'normal' }}>
        {t('home.settings.display.contrast.title')}
      </h3>

      <MenuStepInput
        label={t('home.settings.display.contrast.title')}
        min={0}
        max={100}
        value={contrast}
        onChange={handleContrastChange}
      />
    </>
  )
}