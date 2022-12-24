import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useDispatchMessage } from '../../../services/message.service'
import { useLocation, useNavigate } from 'react-router-dom'
// Store
import AppSelectors from '../../../store/app/app.selectors'
// Components
import { Menu } from '@uncover/games-common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const HomeMenu = () => {

  // Hooks //

  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatchMessage = useDispatchMessage()

  const embedded = useSelector(AppSelectors.embedded)

  // Events //

  // Rendering //

  const items = [{
    icon: <FontAwesomeIcon icon={['fas', 'gamepad']} />,
    selected: location.pathname === '/play',
    text: t('home.play.menu'),
    onClick: () => { navigate('/play') }
  }, {
    icon: <FontAwesomeIcon icon={['fas', 'gear']} />,
    selected: location.pathname === '/settings',
    text: t('home.settings.menu'),
    onClick: () => { navigate('/settings/general') }
  }, {
    icon: <FontAwesomeIcon icon={['fas', 'gifts']} />,
    selected: location.pathname === '/credits',
    text: t('home.credits.menu'),
    onClick: () => { navigate('/credits') }
  }]

  if (embedded) {
    items.push({
      icon: <FontAwesomeIcon icon={['fas', 'right-from-bracket']} />,
      selected: false,
      text: t('home.exit.menu'),
      onClick: () => { dispatchMessage({ type: 'exitGame', payload: null }) }
    })
  }

  return (
    <Menu
      title={t('home.title')}
      items={items}
    />
  )
}