// Game Status //

export type GameStatus =
  'GAME_NOT_STARTED' |
  'GAME_READY' |
  'GAME_ON_GOING' |
  'GAME_ENDED_VICTORY' |
  'GAME_ENDED_DEFEAT'
export const GameStatuses: {
  GAME_NOT_STARTED: GameStatus
  GAME_READY: GameStatus
  GAME_ON_GOING: GameStatus
  GAME_ENDED_VICTORY: GameStatus
  GAME_ENDED_DEFEAT: GameStatus
} = {
  GAME_NOT_STARTED: 'GAME_NOT_STARTED',
  GAME_READY: 'GAME_READY',
  GAME_ON_GOING: 'GAME_ON_GOING',
  GAME_ENDED_VICTORY: 'GAME_ENDED_VICTORY',
  GAME_ENDED_DEFEAT: 'GAME_ENDED_DEFEAT'
}

// Game Size //

export type GameSize =
  { name: '2x2', width: 2, height: 2, available: false } |
  { name: '2x3', width: 3, height: 2, available: true } |
  { name: '2x4', width: 4, height: 2, available: true } |
  { name: '2x5', width: 5, height: 2, available: true } |
  { name: '2x6', width: 6, height: 2, available: true } |
  { name: '2x7', width: 7, height: 2, available: true } |
  { name: '3x2', width: 2, height: 3, available: true } |
  { name: '3x3', width: 3, height: 3, available: true } |
  { name: '3x4', width: 4, height: 3, available: true } |
  { name: '3x5', width: 5, height: 3, available: true } |
  { name: '3x6', width: 6, height: 3, available: true } |
  { name: '3x7', width: 7, height: 3, available: true } |
  { name: '4x2', width: 2, height: 4, available: true } |
  { name: '4x3', width: 3, height: 4, available: true } |
  { name: '4x4', width: 4, height: 4, available: true } |
  { name: '4x5', width: 5, height: 4, available: true } |
  { name: '4x6', width: 6, height: 4, available: true } |
  { name: '4x7', width: 7, height: 4, available: true } |
  { name: '5x2', width: 2, height: 5, available: true } |
  { name: '5x3', width: 3, height: 5, available: true } |
  { name: '5x4', width: 4, height: 5, available: true } |
  { name: '5x5', width: 5, height: 5, available: true } |
  { name: '5x6', width: 6, height: 5, available: true } |
  { name: '5x7', width: 7, height: 5, available: true } |
  { name: '6x2', width: 2, height: 6, available: true } |
  { name: '6x3', width: 3, height: 6, available: true } |
  { name: '6x4', width: 4, height: 6, available: true } |
  { name: '6x5', width: 5, height: 6, available: true } |
  { name: '6x6', width: 6, height: 6, available: true } |
  { name: '6x7', width: 7, height: 6, available: true } |
  { name: '7x2', width: 2, height: 7, available: true } |
  { name: '7x3', width: 3, height: 7, available: true } |
  { name: '7x4', width: 4, height: 7, available: true } |
  { name: '7x5', width: 5, height: 7, available: true } |
  { name: '7x6', width: 6, height: 7, available: true } |
  { name: '7x7', width: 7, height: 7, available: true }
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
  SIZE_2X2: { name: '2x2', width: 2, height: 2, available: false },
  SIZE_2X3: { name: '2x3', width: 3, height: 2, available: true },
  SIZE_2X4: { name: '2x4', width: 4, height: 2, available: true },
  SIZE_2X5: { name: '2x5', width: 5, height: 2, available: true },
  SIZE_2X6: { name: '2x6', width: 6, height: 2, available: true },
  SIZE_2X7: { name: '2x7', width: 7, height: 2, available: true },
  SIZE_3X2: { name: '3x2', width: 2, height: 3, available: true },
  SIZE_3X3: { name: '3x3', width: 3, height: 3, available: true },
  SIZE_3X4: { name: '3x4', width: 4, height: 3, available: true },
  SIZE_3X5: { name: '3x5', width: 5, height: 3, available: true },
  SIZE_3X6: { name: '3x6', width: 6, height: 3, available: true },
  SIZE_3X7: { name: '3x7', width: 7, height: 3, available: true },
  SIZE_4X2: { name: '4x2', width: 2, height: 4, available: true },
  SIZE_4X3: { name: '4x3', width: 3, height: 4, available: true },
  SIZE_4X4: { name: '4x4', width: 4, height: 4, available: true },
  SIZE_4X5: { name: '4x5', width: 5, height: 4, available: true },
  SIZE_4X6: { name: '4x6', width: 6, height: 4, available: true },
  SIZE_4X7: { name: '4x7', width: 7, height: 4, available: true },
  SIZE_5X2: { name: '5x2', width: 2, height: 5, available: true },
  SIZE_5X3: { name: '5x3', width: 3, height: 5, available: true },
  SIZE_5X4: { name: '5x4', width: 4, height: 5, available: true },
  SIZE_5X5: { name: '5x5', width: 5, height: 5, available: true },
  SIZE_5X6: { name: '5x6', width: 6, height: 5, available: true },
  SIZE_5X7: { name: '5x7', width: 7, height: 5, available: true },
  SIZE_6X2: { name: '6x2', width: 2, height: 6, available: true },
  SIZE_6X3: { name: '6x3', width: 3, height: 6, available: true },
  SIZE_6X4: { name: '6x4', width: 4, height: 6, available: true },
  SIZE_6X5: { name: '6x5', width: 5, height: 6, available: true },
  SIZE_6X6: { name: '6x6', width: 6, height: 6, available: true },
  SIZE_6X7: { name: '6x7', width: 7, height: 6, available: true },
  SIZE_7X2: { name: '7x2', width: 2, height: 7, available: true },
  SIZE_7X3: { name: '7x3', width: 3, height: 7, available: true },
  SIZE_7X4: { name: '7x4', width: 4, height: 7, available: true },
  SIZE_7X5: { name: '7x5', width: 5, height: 7, available: true },
  SIZE_7X6: { name: '7x6', width: 6, height: 7, available: true },
  SIZE_7X7: { name: '7x7', width: 7, height: 7, available: true }
}