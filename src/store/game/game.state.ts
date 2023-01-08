import { GameBoardTile } from 'lib/game/board/tiles/tile.model'
import { GameSize, GameStatus } from 'lib/game/constants'

export interface GameState {
  status: GameStatus

  startTime: number
  endTime: number

  clicks: number

  size: GameSize

  theme: string
  background: string
  backgrounds: string[]

  dialog: string | null
  dialogParams: any | null

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
