import AppState from 'store/app/app.state'
import { GameState } from 'store/game/game.state'
import { AudioState } from './audio/audio.state'

export type RootState = {
  app: AppState,
  audio: AudioState,
  game: GameState,
}