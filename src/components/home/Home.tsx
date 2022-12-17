import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
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

const HOME_PAGE: { [key: string]: any } = {}
HOME_PAGE.PLAY = {
  id: 'play',
  icon: <FontAwesomeIcon icon={['fas', 'gamepad']} />,
  title: 'Play',
  content: <HomePlay />
}
HOME_PAGE.SETTINGS_GENERAL = {
  id: 'settings-general',
  icon: <FontAwesomeIcon icon={['fas', 'wrench']} />,
  title: 'General',
  content: <HomeSettingsGeneral />,
}
HOME_PAGE.SETTINGS_AUDIO = {
  id: 'settings-audio',
  icon: <FontAwesomeIcon icon={['fas', 'sliders']} />,
  title: 'Audio',
  content: <HomeSettingsAudio />,
}
HOME_PAGE.SETTINGS_VIDEO = {
  id: 'settings-video',
  icon: <FontAwesomeIcon icon={['fas', 'desktop']} />,
  title: 'Video',
  content: <HomeSettingsVideo />,
}
HOME_PAGE.SETTINGS = {
  id: 'settings',
  icon: <FontAwesomeIcon icon={['fas', 'gear']} />,
  title: 'Settings',
  content: null,
  pages: [
    HOME_PAGE.SETTINGS_GENERAL,
    HOME_PAGE.SETTINGS_AUDIO,
    HOME_PAGE.SETTINGS_VIDEO
  ]
}
HOME_PAGE.CREDITS = {
  id: 'credits',
  icon: <FontAwesomeIcon icon={['fas', 'gifts']} />,
  title: 'Credits',
  content: <HomeCredits />
}
HOME_PAGE.EXIT = {
  id: 'exit',
  icon: <FontAwesomeIcon icon={['fas', 'right-from-bracket']} />,
  title: 'Exit',
  content: <HomeExit />
}

interface HomeProperties {
}

const Home = ({
}: HomeProperties) => {

  // Hooks //

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

  const pages = [
    HOME_PAGE.PLAY,
    HOME_PAGE.SETTINGS,
    HOME_PAGE.CREDITS
  ]
  if (embedded) {
    pages.push(HOME_PAGE.EXIT)
  }

  return (
    <PageMenu
      page={{
        id: 'home',
        title: 'Home',
        content: null,
        pages
      }}
    />
  )
}

export default Home