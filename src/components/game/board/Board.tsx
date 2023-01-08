import React from 'react'
import { useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
// Components
import BoardTile from 'components/game/board/BoardTile'
import { GridTiles } from '@uncover/games-common'

import './Board.css'

export interface BoardProperties {
}

export const Board = ({
}: BoardProperties) => {

  // Hooks //

  const background = useSelector(GameSelectors.background)

  const tiles = useSelector(GameSelectors.boardTiles)
  const size = useSelector(GameSelectors.size)

  // Events //

  // Rendering //

  const renderTiles = () => {
    return tiles.map(renderTile)
  }

  const renderTile = (tileId: string) => {
    return (
      <BoardTile
        key={tileId}
        tileId={tileId}
      />
    )
  }

  const classes = ['board']

  return (
    <div className={classes.join(' ')}>

      <GridTiles
        className='board-layer board-layer__game'
        width={size.width}
        height={size.height}
      >
        {renderTiles()}
      </GridTiles>



    </div>
  )
}
