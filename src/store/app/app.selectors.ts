import { RootState } from 'store/state'

export const base = (state: RootState) => state.app

export const busy = (state: RootState) => base(state).busy
export const busyMessage = (state: RootState) => base(state).busyMessage
export const dialog = (state: RootState) => base(state).dialog
export const dialogParams = (state: RootState) => base(state).dialogParams
export const embedded = (state: RootState) => base(state).embedded
export const language = (state: RootState) => base(state).language
export const loaded = (state: RootState) => base(state).loaded
export const started = (state: RootState) => base(state).started

const AppSelectors = {
  busy,
  busyMessage,
  dialog,
  dialogParams,
  embedded,
  language,
  loaded,
  started,
}

export default AppSelectors
