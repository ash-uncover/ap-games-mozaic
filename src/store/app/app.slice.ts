import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import Language from 'lib/utils/language'

import AppState, { AppLoadStatus, AppLoadStatuses } from 'store/app/app.state'

// STATE //

const initialState: AppState = {
  busy: false,
  busyMessage: '',

  embedded: false,

  language: 'fr',

  loadStatus: AppLoadStatuses.NONE,
}

// REDUCERS //

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

const setLoadStatus: CaseReducer<AppState, PayloadAction<AppLoadStatus>> = (state, action) => {
  state.loadStatus = action.payload
}


// SLICE //

const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setBusy,
    setLanguage,
    setTheme,
    setEmbedded,
    setLoadStatus,
  },
})

export default AppSlice
