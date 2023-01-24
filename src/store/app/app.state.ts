export type AppLoadStatus =
  'NONE' |
  'LOADING' |
  'READY' |
  'STARTED'

export const AppLoadStatuses: {
  NONE: AppLoadStatus
  LOADING: AppLoadStatus
  READY: AppLoadStatus
  STARTED: AppLoadStatus
} = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  READY: 'READY',
  STARTED: 'STARTED',
}

interface AppState {
  busy: boolean
  busyMessage: string

  embedded: boolean

  language: string

  theme?: string

  loadStatus: AppLoadStatus
}

export default AppState