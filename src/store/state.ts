import AppState from 'store/app/app.state'
import { GameState } from 'store/game/game.state'
import { AudioState } from './audio/audio.state'
import { DisplayState } from './display/display.state'

export type RootState = {
  app: AppState,
  audio: AudioState,
  display: DisplayState,
  game: GameState,
}