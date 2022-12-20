import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import {
  ArrayUtils,
  UUID
} from '@uncover/js-utils'

import {
  GameState,
} from 'store/game/game.state'

import { GameBoardTile } from 'lib/game/board/tiles/tile.model'
import { GameSize, GameSizes, GameStatuses } from 'lib/game/constants'

// STATE //

const initialState: GameState = {
  status: GameStatuses.GAME_NOT_STARTED,

  startTime: 0,
  endTime: 0,

  clicks: 0,
  background: null,
  size: GameSizes.SIZE_3X3,

  board: {
    tiles: [],
    hiddenTile: null,
  },
  tiles: {},
}

// REDUCERS //

interface SetSizePayload {
  size: GameSize
}
const setSize: CaseReducer<GameState, PayloadAction<SetSizePayload>> = (state, action) => {
  const {
    size,
  } = action.payload
  state.size = size
}


interface PrepareGamePayload {
  background: string
}
const prepareGame: CaseReducer<GameState, PayloadAction<PrepareGamePayload>> = (state, action) => {
  const {
    background,
  } = action.payload

  const tilesNumber = state.size.width * state.size.height
  const tilesPosition = ArrayUtils.createIntArray(tilesNumber)

  tilesPosition.forEach((tilePosition: number) => {
    const tile: GameBoardTile = {
      id: `tile-${UUID.next()}`,
      hidden: false,
      baseX: tilePosition % state.size.width,
      baseY: Math.floor(tilePosition / state.size.width),
      x: tilePosition % state.size.width,
      y: Math.floor(tilePosition / state.size.width)
    }
    state.tiles[tile.id] = tile
    state.board.tiles.push(tile.id)
  })

  state.background = background
  state.status = GameStatuses.GAME_READY
}

const startGame: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  const tilesNumber = state.size.width * state.size.height
  const tilesPosition = ArrayUtils.shuffle(ArrayUtils.createIntArray(tilesNumber))

  // state.board.hiddenTile = state.board.tiles[state.board.tiles.length - 1]
  // state.tiles[state.board.hiddenTile].x--
  // state.tiles[state.board.hiddenTile].hidden = true
  // state.tiles[state.board.tiles[state.board.tiles.length - 2]].x++


  tilesPosition.forEach((tilePosition: number, index: number) => {
    const tileId = state.board.tiles[tilePosition]
    const tile = state.tiles[tileId]
    tile.x = index % state.size.width
    tile.y = Math.floor(index / state.size.width)
    if (index === state.board.tiles.length - 1) {
      state.board.hiddenTile = tileId
      tile.hidden = true
    }
  })


  state.startTime = new Date().getTime()
  state.clicks = 0
  state.status = GameStatuses.GAME_ON_GOING
}

interface ClickTilePayload {
  tileId: string
}
const clickTile: CaseReducer<GameState, PayloadAction<ClickTilePayload>> = (state, action) => {
  const {
    tileId
  } = action.payload

  const tile = state.tiles[tileId]
  const hiddenTile = state.tiles[state.board.hiddenTile]
  if (tile.x === hiddenTile.x && (tile.y === hiddenTile.y + 1 || tile.y === hiddenTile.y - 1)) {
    const prevY = tile.y
    state.tiles[tileId] = {
      ...tile,
      y: hiddenTile.y
    }
    state.tiles[state.board.hiddenTile] = {
      ...hiddenTile,
      y: prevY
    }
    state.clicks++
  } else if (tile.y === hiddenTile.y && (tile.x === hiddenTile.x + 1 || tile.x === hiddenTile.x - 1)) {
    const prevX = tile.x
    state.tiles[tileId] = {
      ...tile,
      x: hiddenTile.x
    }
    state.tiles[state.board.hiddenTile] = {
      ...hiddenTile,
      x: prevX
    }
    state.clicks++
  }

  const mismatch = Object.values(state.tiles).some((tile) => {
    return tile.x !== tile.baseX || tile.y !== tile.baseY
  })
  if (!mismatch) {
    state.status = GameStatuses.GAME_ENDED_VICTORY
  }
}

const endGame: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  Object.assign(state, initialState)
}

// SLICE //

const GameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    setSize,

    prepareGame,
    startGame,

    clickTile,

    endGame,
  },
})

export default GameSlice
