import { RootState } from 'store/state'

export const base = (state: RootState) => state.game

export const status = (state: RootState) => base(state).status
export const startTime = (state: RootState) => base(state).startTime
export const endTime = (state: RootState) => base(state).endTime
export const clicks = (state: RootState) => base(state).clicks
export const background = (state: RootState) => base(state).background
export const sizeWidth = (state: RootState) => base(state).sizeWidth
export const sizeHeight = (state: RootState) => base(state).sizeHeight

export const board = (state: RootState) => base(state).board
export const boardTiles = (state: RootState) => board(state)?.tiles

export const tiles = (state: RootState) => base(state).tiles
export const tile = (tileId: string) => (state: RootState) => tiles(state)[tileId]


const GameSelectors = {
  status,
  startTime,
  endTime,
  clicks,
  background,
  sizeWidth,
  sizeHeight,

  board,
  boardTiles,

  tiles,
  tile,
}

export default GameSelectors
