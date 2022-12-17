import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { normalizeVolumeValue } from '@uncover/games-common'

import { AudioState } from './audio.state'

// STATE //

const ALPHA_AUDIO = 'alpha-audio'
const USE_LOCAL_STORAGE = true

if (!USE_LOCAL_STORAGE) {
  localStorage.removeItem(ALPHA_AUDIO)
}

const store = (state: AudioState) => {
  localStorage.setItem(ALPHA_AUDIO, JSON.stringify(state))
}

const load = () => {
  return JSON.parse(localStorage.getItem(ALPHA_AUDIO) || '{}')
}

const storedState = USE_LOCAL_STORAGE ? load() : {}

const initialState: AudioState = {
  master: true,
  masterVolume: 100,
  game: true,
  gameVolume: 100,
  music: true,
  musicVolume: 100,
  interface: true,
  interfaceVolume: 100,
  ...storedState
}

// REDUCERS //

const setMaster: CaseReducer<AudioState, PayloadAction<boolean>> = (state, action) => {
  state.master = action.payload
  store(state)
}
const setMasterVolume: CaseReducer<AudioState, PayloadAction<number>> = (state, action) => {
  state.masterVolume = normalizeVolumeValue(action.payload)
  store(state)
}
const setGame: CaseReducer<AudioState, PayloadAction<boolean>> = (state, action) => {
  state.game = action.payload
  store(state)
}
const setGameVolume: CaseReducer<AudioState, PayloadAction<number>> = (state, action) => {
  state.gameVolume = normalizeVolumeValue(action.payload)
  store(state)
}
const setMusic: CaseReducer<AudioState, PayloadAction<boolean>> = (state, action) => {
  state.music = action.payload
  store(state)
}
const setMusicVolume: CaseReducer<AudioState, PayloadAction<number>> = (state, action) => {
  state.musicVolume = normalizeVolumeValue(action.payload)
  store(state)
}
const setInterface: CaseReducer<AudioState, PayloadAction<boolean>> = (state, action) => {
  state.interface = action.payload
  store(state)
}
const setInterfaceVolume: CaseReducer<AudioState, PayloadAction<number>> = (state, action) => {
  state.interfaceVolume = normalizeVolumeValue(action.payload)
  store(state)
}

// SLICE //

const AudioSlice = createSlice({
  name: 'audio',
  initialState,

  reducers: {
    setMaster,
    setMasterVolume,
    setGame,
    setGameVolume,
    setMusic,
    setMusicVolume,
    setInterface,
    setInterfaceVolume,
  },
})

export default AudioSlice
