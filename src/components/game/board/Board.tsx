import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
// Components
import BoardTile from 'components/game/board/BoardTile'
import { GridContainer, GridTiles } from '@uncover/games-common'

import { GameStatuses } from 'lib/game/constants'
import GameSlice from 'store/game/game.slice'

import './Board.css'

const Board = ({

}) => {

  // Hooks //

  const dispatch = useDispatch()

  const status = useSelector(GameSelectors.status)
  const background = useSelector(GameSelectors.background)

  const tiles = useSelector(GameSelectors.boardTiles)
  const size = useSelector(GameSelectors.size)

  // Events //

  const handleStart = () => {
    dispatch(GameSlice.actions.startGame())
  }

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
  if (status === GameStatuses.GAME_READY) {
    classes.push('board-ready')
  }
  if (status === GameStatuses.GAME_ENDED_VICTORY) {
    classes.push('board-victory')
  }
  if (status === GameStatuses.GAME_ENDED_DEFEAT) {
    classes.push('board-defeat')
  }

  return (
    <div className={classes.join(' ')}>

      <GridTiles
        className='board-layer board-layer__game'
        width={size.width}
        height={size.height}
      >
        {renderTiles()}
      </GridTiles>

      <GridContainer
        className='board-layer board-layer__mask'
        width={size.width}
        height={size.height}
      >
        <img
          className='board-layer-image'
          src={background}
        />
        <div
          className='board-layer-action'
        >
          <button
            className='board-layer-button'
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      </GridContainer>

    </div>
  )
}


export default Board