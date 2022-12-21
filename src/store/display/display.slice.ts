import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { DisplayState } from './display.state'

// STATE //

const ALPHA_DISPLAY = 'alpha-display'
const USE_LOCAL_STORAGE = true

if (!USE_LOCAL_STORAGE) {
  localStorage.removeItem(ALPHA_DISPLAY)
}

const store = (state: DisplayState) => {
  localStorage.setItem(ALPHA_DISPLAY, JSON.stringify(state))
}

const load = () => {
  return JSON.parse(localStorage.getItem(ALPHA_DISPLAY) || '{}')
}

const storedState = USE_LOCAL_STORAGE ? load() : {}

const initialState: DisplayState = {
  brightness: 100,
  contrast: 100,
  ...storedState
}

// REDUCERS //

const setBrightness: CaseReducer<DisplayState, PayloadAction<number>> = (state, action) => {
  state.brightness = action.payload
  store(state)
}
const setContrast: CaseReducer<DisplayState, PayloadAction<number>> = (state, action) => {
  state.contrast = action.payload
  store(state)
}

// SLICE //

const DisplaySlice = createSlice({
  name: 'display',
  initialState,

  reducers: {
    setBrightness,
    setContrast,
  },
})

export default DisplaySlice
