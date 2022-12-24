import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AudioSlice from 'store/audio/audio.slice'
import AudioSelectors from 'store/audio/audio.selectors'
import { MenuCheckbox, MenuStepInput } from '@uncover/games-common'
import { useTranslation } from 'react-i18next'
import { Panel } from 'components/common/panel/Panel'
// Components

export const HomeContentSettingsAudio = () => {

  // Hooks //

  const dispatch = useDispatch()

  const { t } = useTranslation()

  const soundMaster = useSelector(AudioSelectors.master)
  const soundMasterVolume = useSelector(AudioSelectors.masterVolume)
  const soundGame = useSelector(AudioSelectors.game)
  const soundGameVolume = useSelector(AudioSelectors.gameVolume)
  const soundMusic = useSelector(AudioSelectors.music)
  const soundMusicVolume = useSelector(AudioSelectors.musicVolume)
  const soundInterface = useSelector(AudioSelectors.interfac)
  const soundInterfaceVolume = useSelector(AudioSelectors.interfaceVolume)

  // Events //

  const handleMasterChange = (value: boolean) => {
    dispatch(AudioSlice.actions.setMaster(value))
  }
  const handleMasterVolumeChange = (value: number) => {
    dispatch(AudioSlice.actions.setMasterVolume(value))
  }

  const handleGameChange = (value: boolean) => {
    dispatch(AudioSlice.actions.setGame(value))
  }
  const handleGameVolumeChange = (value: number) => {
    dispatch(AudioSlice.actions.setGameVolume(value))
  }

  const handleInterfaceChange = (value: boolean) => {
    dispatch(AudioSlice.actions.setInterface(value))
  }
  const handleInterfaceVolumeChange = (value: number) => {
    dispatch(AudioSlice.actions.setInterfaceVolume(value))
  }

  const handleMusicChange = (value: boolean) => {
    dispatch(AudioSlice.actions.setMusic(value))
  }
  const handleMusicVolumeChange = (value: number) => {
    dispatch(AudioSlice.actions.setMusicVolume(value))
  }

  // Rendering //

  return (
    <>
      <Panel>
        <h2>
          {t('home.settings.audio.title')}
        </h2>
      </Panel>

      <Panel title={t('home.settings.audio.master.title')}>
        <MenuCheckbox
          label={t('home.settings.audio.master.enable')}
          checked={soundMaster}
          onChange={handleMasterChange}
        />
        <MenuStepInput
          label={t('home.settings.audio.master.title')}
          min={0}
          max={100}
          value={soundMasterVolume}
          onChange={handleMasterVolumeChange}
        />
      </Panel>

      <Panel title={t('home.settings.audio.game.title')}>
        <MenuCheckbox
          label={t('home.settings.audio.game.enable')}
          checked={soundGame}
          onChange={handleGameChange}
        />
        <MenuStepInput
          label={t('home.settings.audio.game.title')}
          min={0}
          max={100}
          value={soundGameVolume}
          onChange={handleGameVolumeChange}
        />
      </Panel>

      <Panel title={t('home.settings.audio.interface.title')}>
        <MenuCheckbox
          label={t('home.settings.audio.interface.enable')}
          checked={soundInterface}
          onChange={handleInterfaceChange}
        />
        <MenuStepInput
          label={t('home.settings.audio.interface.title')}
          min={0}
          max={100}
          value={soundInterfaceVolume}
          onChange={handleInterfaceVolumeChange}
        />
      </Panel>

      <Panel title={t('home.settings.audio.music.title')}>
        <MenuCheckbox
          label={t('home.settings.audio.music.enable')}
          checked={soundMusic}
          onChange={handleMusicChange}
        />
        <MenuStepInput
          label={t('home.settings.audio.music.title')}
          min={0}
          max={100}
          value={soundMusicVolume}
          onChange={handleMusicVolumeChange}
        />
      </Panel>
    </>
  )
}
