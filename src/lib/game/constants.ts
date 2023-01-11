// Game Status //

export type GameStatus =
  'GAME_NOT_STARTED' |
  'GAME_LOADING' |
  'GAME_READY' |
  'GAME_ON_GOING' |
  'GAME_ENDED_VICTORY' |
  'GAME_ENDED_DEFEAT'
export const GameStatuses: {
  GAME_NOT_STARTED: GameStatus
  GAME_LOADING: GameStatus
  GAME_READY: GameStatus
  GAME_ON_GOING: GameStatus
  GAME_ENDED_VICTORY: GameStatus
  GAME_ENDED_DEFEAT: GameStatus
} = {
  GAME_NOT_STARTED: 'GAME_NOT_STARTED',
  GAME_LOADING: 'GAME_LOADING',
  GAME_READY: 'GAME_READY',
  GAME_ON_GOING: 'GAME_ON_GOING',
  GAME_ENDED_VICTORY: 'GAME_ENDED_VICTORY',
  GAME_ENDED_DEFEAT: 'GAME_ENDED_DEFEAT'
}

// Game Size //

export type GameSize =
  { id: '2x2', width: 2, height: 2, available: false } |
  { id: '2x3', width: 3, height: 2, available: true } |
  { id: '2x4', width: 4, height: 2, available: true } |
  { id: '2x5', width: 5, height: 2, available: true } |
  { id: '2x6', width: 6, height: 2, available: true } |
  { id: '2x7', width: 7, height: 2, available: true } |
  { id: '3x2', width: 2, height: 3, available: true } |
  { id: '3x3', width: 3, height: 3, available: true } |
  { id: '3x4', width: 4, height: 3, available: true } |
  { id: '3x5', width: 5, height: 3, available: true } |
  { id: '3x6', width: 6, height: 3, available: true } |
  { id: '3x7', width: 7, height: 3, available: true } |
  { id: '4x2', width: 2, height: 4, available: true } |
  { id: '4x3', width: 3, height: 4, available: true } |
  { id: '4x4', width: 4, height: 4, available: true } |
  { id: '4x5', width: 5, height: 4, available: true } |
  { id: '4x6', width: 6, height: 4, available: true } |
  { id: '4x7', width: 7, height: 4, available: true } |
  { id: '5x2', width: 2, height: 5, available: true } |
  { id: '5x3', width: 3, height: 5, available: true } |
  { id: '5x4', width: 4, height: 5, available: true } |
  { id: '5x5', width: 5, height: 5, available: true } |
  { id: '5x6', width: 6, height: 5, available: true } |
  { id: '5x7', width: 7, height: 5, available: true } |
  { id: '6x2', width: 2, height: 6, available: true } |
  { id: '6x3', width: 3, height: 6, available: true } |
  { id: '6x4', width: 4, height: 6, available: true } |
  { id: '6x5', width: 5, height: 6, available: true } |
  { id: '6x6', width: 6, height: 6, available: true } |
  { id: '6x7', width: 7, height: 6, available: true } |
  { id: '7x2', width: 2, height: 7, available: true } |
  { id: '7x3', width: 3, height: 7, available: true } |
  { id: '7x4', width: 4, height: 7, available: true } |
  { id: '7x5', width: 5, height: 7, available: true } |
  { id: '7x6', width: 6, height: 7, available: true } |
  { id: '7x7', width: 7, height: 7, available: true }
export const GameSizes: {
  SIZE_2X2: GameSize
  SIZE_2X3: GameSize
  SIZE_2X4: GameSize
  SIZE_2X5: GameSize
  SIZE_2X6: GameSize
  SIZE_2X7: GameSize
  SIZE_3X2: GameSize
  SIZE_3X3: GameSize
  SIZE_3X4: GameSize
  SIZE_3X5: GameSize
  SIZE_3X6: GameSize
  SIZE_3X7: GameSize
  SIZE_4X2: GameSize
  SIZE_4X3: GameSize
  SIZE_4X4: GameSize
  SIZE_4X5: GameSize
  SIZE_4X6: GameSize
  SIZE_4X7: GameSize
  SIZE_5X2: GameSize
  SIZE_5X3: GameSize
  SIZE_5X4: GameSize
  SIZE_5X5: GameSize
  SIZE_5X6: GameSize
  SIZE_5X7: GameSize
  SIZE_6X2: GameSize
  SIZE_6X3: GameSize
  SIZE_6X4: GameSize
  SIZE_6X5: GameSize
  SIZE_6X6: GameSize
  SIZE_6X7: GameSize
  SIZE_7X2: GameSize
  SIZE_7X3: GameSize
  SIZE_7X4: GameSize
  SIZE_7X5: GameSize
  SIZE_7X6: GameSize
  SIZE_7X7: GameSize
} = {
  SIZE_2X2: { id: '2x2', width: 2, height: 2, available: false },
  SIZE_2X3: { id: '2x3', width: 3, height: 2, available: true },
  SIZE_2X4: { id: '2x4', width: 4, height: 2, available: true },
  SIZE_2X5: { id: '2x5', width: 5, height: 2, available: true },
  SIZE_2X6: { id: '2x6', width: 6, height: 2, available: true },
  SIZE_2X7: { id: '2x7', width: 7, height: 2, available: true },
  SIZE_3X2: { id: '3x2', width: 2, height: 3, available: true },
  SIZE_3X3: { id: '3x3', width: 3, height: 3, available: true },
  SIZE_3X4: { id: '3x4', width: 4, height: 3, available: true },
  SIZE_3X5: { id: '3x5', width: 5, height: 3, available: true },
  SIZE_3X6: { id: '3x6', width: 6, height: 3, available: true },
  SIZE_3X7: { id: '3x7', width: 7, height: 3, available: true },
  SIZE_4X2: { id: '4x2', width: 2, height: 4, available: true },
  SIZE_4X3: { id: '4x3', width: 3, height: 4, available: true },
  SIZE_4X4: { id: '4x4', width: 4, height: 4, available: true },
  SIZE_4X5: { id: '4x5', width: 5, height: 4, available: true },
  SIZE_4X6: { id: '4x6', width: 6, height: 4, available: true },
  SIZE_4X7: { id: '4x7', width: 7, height: 4, available: true },
  SIZE_5X2: { id: '5x2', width: 2, height: 5, available: true },
  SIZE_5X3: { id: '5x3', width: 3, height: 5, available: true },
  SIZE_5X4: { id: '5x4', width: 4, height: 5, available: true },
  SIZE_5X5: { id: '5x5', width: 5, height: 5, available: true },
  SIZE_5X6: { id: '5x6', width: 6, height: 5, available: true },
  SIZE_5X7: { id: '5x7', width: 7, height: 5, available: true },
  SIZE_6X2: { id: '6x2', width: 2, height: 6, available: true },
  SIZE_6X3: { id: '6x3', width: 3, height: 6, available: true },
  SIZE_6X4: { id: '6x4', width: 4, height: 6, available: true },
  SIZE_6X5: { id: '6x5', width: 5, height: 6, available: true },
  SIZE_6X6: { id: '6x6', width: 6, height: 6, available: true },
  SIZE_6X7: { id: '6x7', width: 7, height: 6, available: true },
  SIZE_7X2: { id: '7x2', width: 2, height: 7, available: true },
  SIZE_7X3: { id: '7x3', width: 3, height: 7, available: true },
  SIZE_7X4: { id: '7x4', width: 4, height: 7, available: true },
  SIZE_7X5: { id: '7x5', width: 5, height: 7, available: true },
  SIZE_7X6: { id: '7x6', width: 6, height: 7, available: true },
  SIZE_7X7: { id: '7x7', width: 7, height: 7, available: true }
}

export const getSize = (sizeId: string) => {
  return Object.values(GameSizes).find(size => size.id === sizeId)
}

export const GameSizesPlayable: GameSize[] = [
  GameSizes.SIZE_2X2,
  GameSizes.SIZE_3X3,
  GameSizes.SIZE_4X4,
  GameSizes.SIZE_5X5,
  GameSizes.SIZE_6X6,
  GameSizes.SIZE_7X7
]