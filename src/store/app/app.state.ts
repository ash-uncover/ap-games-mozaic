interface AppState {
  busy: boolean
  busyMessage: string

  dialog: string | null
  dialogParams: any | null

  embedded: boolean

  language: string

  theme: string

  loaded: boolean
  started: boolean
}

export default AppState