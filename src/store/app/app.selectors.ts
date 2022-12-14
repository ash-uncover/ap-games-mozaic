import { RootState } from 'store/state'

export const base = (state: RootState) => state.app

export const busy = (state: RootState) => base(state).busy
export const busyMessage = (state: RootState) => base(state).busyMessage
export const embedded = (state: RootState) => base(state).embedded
export const language = (state: RootState) => base(state).language
export const theme = (state: RootState) => base(state).theme
export const loaded = (state: RootState) => base(state).loaded
export const started = (state: RootState) => base(state).started

const AppSelectors = {
  busy,
  busyMessage,

  embedded,
  language,
  theme,
  loaded,
  started,
}

export default AppSelectors
