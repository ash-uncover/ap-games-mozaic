import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu } from '@uncover/games-common'

export const HomeMenuSettings = () => {

  // Hooks //

  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  // Events //

  // Rendering //

  const items = [{
    icon: <FontAwesomeIcon icon={['fas', 'wrench']} />,
    selected: location.pathname.endsWith('general'),
    text: t('home.settings.general.menu'),
    onClick: () => { navigate('/settings/general', { replace: true }) },
  }, {
    icon: <FontAwesomeIcon icon={['fas', 'sliders']} />,
    selected: location.pathname.endsWith('audio'),
    text: t('home.settings.audio.menu'),
    onClick: () => { navigate('/settings/audio', { replace: true }) },
  }, {
    icon: <FontAwesomeIcon icon={['fas', 'desktop']} />,
    selected: location.pathname.endsWith('display'),
    text: t('home.settings.display.menu'),
    onClick: () => { navigate('/settings/display', { replace: true }) },
  }, {
    icon: <FontAwesomeIcon icon={['fas', 'right-from-bracket']} />,
    selected: false,
    text: t('BACK'),
    onClick: () => { navigate(-1) },
  }]

  return (
    <Menu
      title={t('home.settings.menu')}
      items={items}
    />
  )
}