import { GameBoardTile } from 'lib/game/board/tiles/tile.model'
import { GameSize, GameStatus } from 'lib/game/constants'

export interface GameState {
  status: GameStatus

  startTime: number
  endTime: number

  clicks: number

  background: string
  size: GameSize

  board: GameBoardState

  tiles: GameBoardTilesState
}

export interface GameBoardState {
  tiles: string[]
  hiddenTile: string
}

export interface GameBoardTilesState {
  [key: string]: GameBoardTile
}
