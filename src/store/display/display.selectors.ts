import { RootState } from 'store/state'

export const base = (state: RootState) => state.display

export const brightness = (state: RootState) => base(state).brightness
export const contrast = (state: RootState) => base(state).contrast

const DisplaySelectors = {
  brightness,
  contrast,
}

export default DisplaySelectors
