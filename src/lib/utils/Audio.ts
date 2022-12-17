import CONFIG from 'config'
import { AudioManager } from '@uncover/games-common'

export const AudioFiles = {
  home: 'home.mp3',
  game: 'game.mp3',
  menuChange: 'menu_change.mp3',
  step: 'step.mp3',
}

export const Audio = new AudioManager(`${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/`)

export default Audio