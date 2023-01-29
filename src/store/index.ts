import { configureStore } from '@reduxjs/toolkit'

import AppSlice from 'store/app/app.slice'
import DisplaySlice from 'store/display/display.slice'
import GameSlice from 'store/game/game.slice'

export default configureStore({
  reducer: {
    app: AppSlice.reducer,
    display: DisplaySlice.reducer,
    game: GameSlice.reducer,
  }
})
