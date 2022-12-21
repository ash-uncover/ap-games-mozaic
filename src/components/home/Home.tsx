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
import { HomeSettingsGeneral } from './settings/general/HomeSettingsGeneral'
import { HomeSettingsAudio } from './settings/audio/HomeSettingsAudio'
import { HomeCredits } from './credits/HomeCredits'
import { HomeSettingsDisplay } from './settings/display/HomeSettingsDisplay'
import { HomePlay } from './play/HomePlay'
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

  const translatePage = (page) => {
    return {
      ...page,
      pages: page.pages ? page.pages.map(translatePage) : page.pages,
      title: t(page.title)
    }
  }

  const pages = [{
    id: 'play',
    icon: <FontAwesomeIcon icon={['fas', 'gamepad']} />,
    title: t('home.play.menu'),
    content: <HomePlay />
  }, {
    id: 'settings',
    icon: <FontAwesomeIcon icon={['fas', 'gear']} />,
    title: t('home.settings.menu'),
    content: null,
    pages: [{
      id: 'settings-general',
      icon: <FontAwesomeIcon icon={['fas', 'wrench']} />,
      title: t('home.settings.general.menu'),
      content: <HomeSettingsGeneral />,
    }, {
      id: 'settings-audio',
      icon: <FontAwesomeIcon icon={['fas', 'sliders']} />,
      title: t('home.settings.audio.menu'),
      content: <HomeSettingsAudio />,
    }, {
      id: 'settings-display',
      icon: <FontAwesomeIcon icon={['fas', 'desktop']} />,
      title: t('home.settings.display.menu'),
      content: <HomeSettingsDisplay />,
    }]
  }, {
    id: 'credits',
    icon: <FontAwesomeIcon icon={['fas', 'gifts']} />,
    title: t('home.credits.menu'),
    content: <HomeCredits />
  }]

  if (embedded) {
    pages.push({
      id: 'exit',
      icon: <FontAwesomeIcon icon={['fas', 'right-from-bracket']} />,
      title: t('home.exit.menu'),
      content: <HomeExit />
    })
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