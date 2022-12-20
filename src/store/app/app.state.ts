interface AppState {
  busy: boolean
  busyMessage: string

  embedded: boolean

  language: string

  theme: string

  loaded: boolean
  started: boolean
}

export default AppState