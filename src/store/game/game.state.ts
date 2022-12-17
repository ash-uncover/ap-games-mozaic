import { GameBoardTile } from 'lib/game/board/tiles/tile.model'
import { GameStatus } from 'lib/game/constants'

export interface GameState {
  status: GameStatus

  startTime: number
  endTime: number

  clicks: number

  background: string
  sizeWidth: number
  sizeHeight: number

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
