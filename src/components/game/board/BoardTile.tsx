import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Components
import Tile from './tile/Tile'

import './BoardTile.css'

interface BoardTileProperties {
  tileId: string
}

const BoardTile = ({
  tileId
}: BoardTileProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const tile = useSelector(GameSelectors.tile(tileId))
  const size = useSelector(GameSelectors.size)

  // Events //

  const handleTileClick = () => {
    dispatch(GameSlice.actions.clickTile({ tileId }))
  }

  // Rendering //

  if (tile.hidden) {
    return null
  }

  const tileSize = 100 / size.width

  return (
    <div
      className='board-tile'
      style={{
        width: `${tileSize}%`,
        transform: `translateX(${tile.x * 100}%) translateY(${tile.y * 100}%)`
      }}
    >
      <Tile
        {...tile}
        onClick={handleTileClick}
      />
    </div>
  )
}

export default BoardTile