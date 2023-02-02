import {
  CaseReducer,
  createAction,
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
import { DIALOG } from 'components/game/dialogs/Dialogs'
import { isShuffled, isSolvable } from 'lib/game/board/board.helper'

// STATE //

const initialState: GameState = {
  status: GameStatuses.GAME_NOT_STARTED,

  startTime: 0,
  endTime: 0,

  clicks: 0,

  size: GameSizes.SIZE_3X3,

  theme: null,
  background: null,

  dialog: null,
  dialogParams: null,

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
  state.size = action.payload.size
}

const gameLaunch: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  state.status = GameStatuses.GAME_LOADING
}

const gameReady: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  state.status = GameStatuses.GAME_READY
}

interface GameStartPayload {
  background: string
}
const gameStart: CaseReducer<GameState, PayloadAction<GameStartPayload>> = (state, action) => {
  state.background = action.payload.background

  const tilesNumber = state.size.width * state.size.height
  const tilesPositionBase = ArrayUtils.createIntArray(tilesNumber)

  tilesPositionBase.forEach((tilePosition: number) => {
    const x = tilePosition % state.size.width
    const y = Math.floor(tilePosition / state.size.width)
    const tile: GameBoardTile = {
      id: `tile-${UUID.next()}`,
      hidden: false,
      baseX: x,
      baseY: y,
      x: x,
      y: y
    }
    if (y === state.size.width - 1 && x === state.size.height - 1) {
      tile.hidden = true
      state.board.hiddenTile = tile.id
    }
    state.tiles[tile.id] = tile
    state.board.tiles.push(tile.id)
  })

  let tilesPosition = ArrayUtils.shuffle(tilesPositionBase)
  while (!isShuffled(tilesPosition) || !isSolvable(tilesPosition)) {
    tilesPosition = ArrayUtils.shuffle(tilesPositionBase)
  }

  tilesPosition.forEach((tilePosition: number, index: number) => {
    const tileId = state.board.tiles[tilePosition]
    const tile = state.tiles[tileId]
    tile.x = index % state.size.width
    tile.y = Math.floor(index / state.size.width)
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

const restartGame: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  state.board = {
    tiles: [],
    hiddenTile: null,
  }
  state.tiles = {}
}

const endGame: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  Object.assign(state, {
    ...initialState,
    size: state.size,
    theme: state.theme
  })
}

type PayloadDialog = {
  dialog: string | null,
  params?: any,
}
const openDialog: CaseReducer<GameState, PayloadAction<PayloadDialog>> = (state, action) => {
  const {
    dialog,
    params,
  } = action.payload
  state.dialog = dialog
  state.dialogParams = params
}
const closeDialog: CaseReducer<GameState, PayloadAction<void>> = (state, action) => {
  state.dialog = null
  state.dialogParams = null
}

const setThemeAction = createAction('app/setTheme')
const setTheme: CaseReducer<GameState, PayloadAction<string>> = (state, action) => {
  state.theme = action.payload
}

// SLICE //

const GameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
    setSize,

    gameLaunch,
    gameReady,
    gameStart,

    clickTile,

    restartGame,
    endGame,

    openDialog,
    closeDialog,
  },

  extraReducers: (builder) => {
   builder.addCase(setThemeAction, setTheme)
  }
})

export default GameSlice
