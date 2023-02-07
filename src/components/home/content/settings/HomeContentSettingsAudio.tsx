import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAudioVolume } from '@uncover/games-common'
// Store
// Components
import { Panel, Switch, Slider } from '@uncover/games-common'

export const HomeContentSettingsAudio = () => {

  // Hooks //

  const { t } = useTranslation()

  const {
    master,
    masterVolume,
    game,
    gameVolume,
    music,
    musicVolume,
    ui,
    uiVolume,

    setMaster,
    setMasterVolume,
    setGame,
    setGameVolume,
    setMusic,
    setMusicVolume,
    setUi,
    setUiVolume,
  } = useAudioVolume()

  // Events //

  const handleMasterChange = (value: boolean) => {
    setMaster(value)
  }
  const handleMasterVolumeChange = (value: number) => {
    setMasterVolume(value)
  }

  const handleGameChange = (value: boolean) => {
    setGame(value)
  }
  const handleGameVolumeChange = (value: number) => {
    setGameVolume(value)
  }

  const handleUiChange = (value: boolean) => {
    setUi(value)
  }
  const handleUiVolumeChange = (value: number) => {
    setUiVolume(value)
  }

  const handleMusicChange = (value: boolean) => {
    setMusic(value)
  }
  const handleMusicVolumeChange = (value: number) => {
    setMusicVolume(value)
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
        <Switch
          label={t('home.settings.audio.master.enable')}
          checked={master}
          onChange={handleMasterChange}
        />
        <Slider
          disabled={!master}
          label={t('home.settings.audio.master.title')}
          min={0}
          max={100}
          value={masterVolume}
          onChange={handleMasterVolumeChange}
        />
      </Panel>

      <Panel title={t('home.settings.audio.game.title')}>
        <Switch
          label={t('home.settings.audio.game.enable')}
          checked={game}
          onChange={handleGameChange}
        />
        <Slider
          disabled={!game}
          label={t('home.settings.audio.game.title')}
          min={0}
          max={100}
          value={gameVolume}
          onChange={handleGameVolumeChange}
        />
      </Panel>

      <Panel title={t('home.settings.audio.interface.title')}>
        <Switch
          label={t('home.settings.audio.interface.enable')}
          checked={ui}
          onChange={handleUiChange}
        />
        <Slider
          disabled={!ui}
          label={t('home.settings.audio.interface.title')}
          min={0}
          max={100}
          value={uiVolume}
          onChange={handleUiVolumeChange}
        />
      </Panel>

      <Panel title={t('home.settings.audio.music.title')}>
        <Switch
          label={t('home.settings.audio.music.enable')}
          checked={music}
          onChange={handleMusicChange}
        />
        <Slider
          disabled={!music}
          label={t('home.settings.audio.music.title')}
          min={0}
          max={100}
          value={musicVolume}
          onChange={handleMusicVolumeChange}
        />
      </Panel>
    </>
  )
}
