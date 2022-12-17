import React from 'react'
import { useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
// Components
import BoardTile from 'components/game/board/BoardTile'
import { GridContainer } from '@uncover/games-common'

import './Board.css'

const Board = ({

}) => {

  // Hooks //

  const tiles = useSelector(GameSelectors.boardTiles)
  const sizeWidth = useSelector(GameSelectors.sizeWidth)
  const sizeHeight = useSelector(GameSelectors.sizeHeight)

  // Events //

  // Rendering //

  const renderTile = (tileId: string) => {
    return (
      <BoardTile
        key={tileId}
        tileId={tileId}
      />
    )
  }

  return (
    <div className='board'>
      <GridContainer
        width={sizeWidth}
        height={sizeHeight}
      >
        {tiles.map(renderTile)}
      </GridContainer>
    </div>
  )
}

export default Board