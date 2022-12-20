import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
// Components
import BoardTile from 'components/game/board/BoardTile'
import { GridContainer } from '@uncover/games-common'

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
      <GridContainer
        width={size.width}
        height={size.height}
      >
        {tiles.map(renderTile)}
        <div className='board-layer'>
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
        </div>
      </GridContainer>
    </div>
  )
}

export default Board