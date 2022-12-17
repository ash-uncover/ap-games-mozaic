import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import AudioManager from 'lib/utils/Audio'
import AudioSelectors from 'store/audio/audio.selectors'

const Audio = () => {

  // Hooks //

  const master = useSelector(AudioSelectors.master)
  useEffect(() => {
    AudioManager.master = master
  }, [master])

  const masterVolume = useSelector(AudioSelectors.masterVolume)
  useEffect(() => {
    AudioManager.masterVolume = masterVolume
  }, [masterVolume])

  const soundGame = useSelector(AudioSelectors.game)
  useEffect(() => {
    AudioManager.game = soundGame
  }, [soundGame])

  const soundGameVolume = useSelector(AudioSelectors.gameVolume)
  useEffect(() => {
    AudioManager.gameVolume = soundGameVolume
  }, [soundGameVolume])

  const soundMusic = useSelector(AudioSelectors.music)
  useEffect(() => {
    AudioManager.music = soundMusic
  }, [soundMusic])

  const soundMusicVolume = useSelector(AudioSelectors.musicVolume)
  useEffect(() => {
    AudioManager.musicVolume = soundMusicVolume
  }, [soundMusicVolume])

  const soundInterface = useSelector(AudioSelectors.interfac)
  useEffect(() => {
    AudioManager.interface = soundInterface
  }, [soundInterface])

  const soundInterfaceVolume = useSelector(AudioSelectors.interfaceVolume)
  useEffect(() => {
    AudioManager.interfaceVolume = soundInterfaceVolume
  }, [soundInterfaceVolume])

  // Rendering //

  return null
}

export default Audio
