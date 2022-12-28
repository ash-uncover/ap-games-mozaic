import { GameState } from 'store/game/game.state'

export const getTile = (
  game: GameState,
  tileId: string,
) => {
  return game.tiles[tileId]
}

export const isSolvable = (tiles: number[]): boolean => {
  const size = Math.sqrt(tiles.length)
  const sizeEven = size % 2 === 0
  let count = 0
  let miscPosition = 0
  for (let i = 0 ; i < tiles.length ; i++) {
    for (let j = i + 1 ; j < tiles.length ; j++) {
      if (tiles[i] === tiles.length - 1) {
        miscPosition = size - Math.floor(i / size)
      } else if (tiles[i] > tiles[j]) {
        count++
      }
    }
  }
  const countEven = count % 2 === 0
  if (!sizeEven) {
    return countEven
  }
  if (miscPosition % 2) {
    return countEven
  }
  return !countEven
}