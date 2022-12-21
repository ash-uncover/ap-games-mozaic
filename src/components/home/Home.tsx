import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
// Store
import AppSelectors from 'store/app/app.selectors'
// Libs
import Audio, { AudioFiles } from 'lib/utils/Audio'
import { AudioTypes, PageMenu } from '@uncover/games-common'
import { ShortcutManager, Shortcuts } from '@uncover/games-common'
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HomeSettingsGeneral from './settings/HomeSettingsGeneral'
import HomeSettingsAudio from './settings/HomeSettingsAudio'
import HomeCredits from './credits/HomeCredits'
import HomeSettingsVideo from './settings/HomeSettingsVideo'
import HomePlay from './play/HomePlay'
import { HomeExit } from './exit/HomeExit'

interface HomeProperties {
}

const Home = ({
}: HomeProperties) => {

  // Hooks //

  const { t } = useTranslation()

  const embedded = useSelector(AppSelectors.embedded)

  useEffect(() => {
    return Audio.play(
      AudioFiles.home,
      AudioTypes.MUSIC
    )
  }, [])

  useEffect(() => {
    const shortcuts: Shortcuts = {
      id: 'home-shortcuts',
      priority: 1,
      shortcuts: []
    }
    ShortcutManager.addShortcuts(shortcuts)
  }, [])

  // Rendering //

  const HOME_PAGE_PLAY = {
    id: 'play',
    icon: <FontAwesomeIcon icon={['fas', 'gamepad']} />,
    title: t('home.play.menu'),
    content: <HomePlay />
  }
  const HOME_PAGE_SETTINGS_GENERAL = {
    id: 'settings-general',
    icon: <FontAwesomeIcon icon={['fas', 'wrench']} />,
    title: t('home.settings.general.menu'),
    content: <HomeSettingsGeneral />,
  }
  const HOME_PAGE_SETTINGS_AUDIO = {
    id: 'settings-audio',
    icon: <FontAwesomeIcon icon={['fas', 'sliders']} />,
    title: t('home.settings.audio.menu'),
    content: <HomeSettingsAudio />,
  }
  const HOME_PAGE_SETTINGS_VIDEO = {
    id: 'settings-video',
    icon: <FontAwesomeIcon icon={['fas', 'desktop']} />,
    title: t('home.settings.video.menu'),
    content: <HomeSettingsVideo />,
  }
  const HOME_PAGE_SETTINGS = {
    id: 'settings',
    icon: <FontAwesomeIcon icon={['fas', 'gear']} />,
    title: t('home.settings.menu'),
    content: null,
    pages: [
      HOME_PAGE_SETTINGS_GENERAL,
      HOME_PAGE_SETTINGS_AUDIO,
      HOME_PAGE_SETTINGS_VIDEO
    ]
  }
  const HOME_PAGE_CREDITS = {
    id: 'credits',
    icon: <FontAwesomeIcon icon={['fas', 'gifts']} />,
    title: t('home.credits.menu'),
    content: <HomeCredits />
  }
  const HOME_PAGE_EXIT = {
    id: 'exit',
    icon: <FontAwesomeIcon icon={['fas', 'right-from-bracket']} />,
    title: t('home.settings.exit.menu'),
    content: <HomeExit />
  }

  const pages = [
    HOME_PAGE_PLAY,
    HOME_PAGE_SETTINGS,
    HOME_PAGE_CREDITS
  ]
  if (embedded) {
    pages.push(HOME_PAGE_EXIT)
  }

  return (
    <PageMenu
      page={{
        id: 'home',
        title: t('home.title'),
        content: null,
        pages
      }}
    />
  )
}

export default Home