import { GameState } from 'store/game/game.state'

export const getTile = (
  game: GameState,
  tileId: string,
) => {
  return game.tiles[tileId]
}
