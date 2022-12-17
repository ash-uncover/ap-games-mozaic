import { configureStore } from '@reduxjs/toolkit'

import AppSlice from 'store/app/app.slice'
import AudioSlice from 'store/audio/audio.slice'
import GameSlice from 'store/game/game.slice'

export default configureStore({
  reducer: {
    app: AppSlice.reducer,
    audio: AudioSlice.reducer,
    game: GameSlice.reducer,
  }
})
