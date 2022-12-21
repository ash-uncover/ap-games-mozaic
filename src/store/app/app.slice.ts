import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import Language from 'lib/utils/language'

import AppState from 'store/app/app.state'

// STATE //

const initialState: AppState = {
  busy: false,
  busyMessage: '',

  embedded: false,

  language: 'fr',

  loaded: false,
  started: false,
}

// REDUCERS //

const startApp: CaseReducer<AppState, PayloadAction<PayloadBusy>> = (state, action) => {
  state.started = true
}

type PayloadBusy = {
  busy: boolean,
  busyMessage?: string
}
const setBusy: CaseReducer<AppState, PayloadAction<PayloadBusy>> = (state, action) => {
  const {
    busy,
    busyMessage
  } = action.payload
  state.busy = busy
  state.busyMessage = busy ? busyMessage || '' : ''
}

interface PayloadEmbedded {
  embedded: boolean
}
const setEmbedded: CaseReducer<AppState, PayloadAction<PayloadEmbedded>> = (state, action) => {
  const {
    embedded
  } = action.payload
  state.embedded = embedded
}

const setLanguage: CaseReducer<AppState, PayloadAction<string>> = (state, action) => {
  state.language = action.payload
}

const setTheme: CaseReducer<AppState, PayloadAction<string>> = (state, action) => {
  state.theme = action.payload
}

const setLoaded: CaseReducer<AppState, PayloadAction<boolean>> = (state, action) => {
  state.loaded = action.payload
}


// SLICE //

const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    startApp,
    setBusy,
    setLanguage,
    setTheme,
    setEmbedded,
    setLoaded,
  },
})

export default AppSlice
