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

  // Events //

  const handleTileClick = () => {
    dispatch(GameSlice.actions.clickTile({ tileId }))
  }

  // Rendering //

  if (tile.hidden) {
    return null
  }

  return (
    <div
      className='board-tile'
      style={{
        transform: `translateX(${(tile.x - tile.baseX) * 100}%) translateY(${(tile.y - tile.baseY) * 100}%)`
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