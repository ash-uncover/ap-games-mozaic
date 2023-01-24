import { RootState } from 'store/state'

export const base = (state: RootState) => state.app

export const busy = (state: RootState) => base(state).busy
export const busyMessage = (state: RootState) => base(state).busyMessage
export const embedded = (state: RootState) => base(state).embedded
export const language = (state: RootState) => base(state).language
export const theme = (state: RootState) => base(state).theme
export const loadStatus = (state: RootState) => base(state).loadStatus

const AppSelectors = {
  busy,
  busyMessage,

  embedded,
  language,
  theme,
  loadStatus,
}

export default AppSelectors
