import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AudioSlice from 'store/audio/audio.slice'
import AudioSelectors from 'store/audio/audio.selectors'
import { MenuCheckbox, MenuStepInput } from '@uncover/games-common'
// Components

const HomeSettingsAudio = () => {

  // Hooks //

  const dispatch = useDispatch()

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
      <h2 style={{ fontWeight: 'normal' }}>
        Audio Settings
      </h2>

      <h3 style={{ fontWeight: 'normal' }}>
        Master
      </h3>

      <MenuCheckbox
        label='Enable Sounds'
        checked={soundMaster}
        onChange={handleMasterChange}
      />
      <MenuStepInput
        label='Master Volume'
        min={0}
        max={100}
        value={soundMasterVolume}
        onChange={handleMasterVolumeChange}
      />

      <h3 style={{ fontWeight: 'normal' }}>
        Game
      </h3>

      <MenuCheckbox
        label='Enable Game Sounds'
        checked={soundGame}
        onChange={handleGameChange}
      />
      <MenuStepInput
        label='Enable Game Sounds'
        min={0}
        max={100}
        value={soundGameVolume}
        onChange={handleGameVolumeChange}
      />


      <h3 style={{ fontWeight: 'normal' }}>
        Interface
      </h3>

      <MenuCheckbox
        label='Enable Interface Sounds'
        checked={soundInterface}
        onChange={handleInterfaceChange}
      />
      <MenuStepInput
        label='Interface Volumne'
        min={0}
        max={100}
        value={soundInterfaceVolume}
        onChange={handleInterfaceVolumeChange}
      />

      <h3 style={{ fontWeight: 'normal' }}>
        Music
      </h3>

      <MenuCheckbox
        label='Enable Music'
        checked={soundMusic}
        onChange={handleMusicChange}
      />
      <MenuStepInput
        label='Music Volumne'
        min={0}
        max={100}
        value={soundMusicVolume}
        onChange={handleMusicVolumeChange}
      />
    </>
  )
}



export default HomeSettingsAudio