import { RootState } from 'store/state'

export const base = (state: RootState) => state.audio

export const master = (state: RootState) => base(state).master
export const masterVolume = (state: RootState) => base(state).masterVolume
export const game = (state: RootState) => base(state).game
export const gameVolume = (state: RootState) => base(state).gameVolume
export const music = (state: RootState) => base(state).music
export const musicVolume = (state: RootState) => base(state).musicVolume
export const interfac = (state: RootState) => base(state).interface
export const interfaceVolume = (state: RootState) => base(state).interfaceVolume

const AudioSelectors = {
  master,
  masterVolume,
  game,
  gameVolume,
  music,
  musicVolume,
  interfac,
  interfaceVolume,
}

export default AudioSelectors
