import React from 'react'
import { useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
import { GameBoardTile } from 'lib/game/board/tiles/tile.model'

import './BoardTileInner.css'

interface TileProperties extends GameBoardTile {
  id: string
  hidden: boolean
  baseX: number
  baseY: number
  x: number
  y: number

  onClick: () => void
}

const Tile = ({
  id,
  hidden,
  baseX,
  baseY,
  x,
  y,

  onClick
}: TileProperties) => {

  // Hooks //

  const background = useSelector(GameSelectors.background)
  const size= useSelector(GameSelectors.size)

  // Events //

  const handleClick = () => {
    onClick()
  }

  // Rendering //

  const classes = ['board-tile-inner']

  return (
    <div
      className={classes.join(' ')}
      onClick={handleClick}
    >
      {!hidden ?
        <>
          <img
            className='board-tile-image'
            src={background}
            height={`${size.height * 100}%`}
            width={`${size.width * 100}%`}
            draggable={false}
            style={{
              position: 'absolute',
              top: `${-baseY * 100}%`,
              left: `${-baseX * 100}%`,
            }}
          />
        </>
        :
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      }
    </div>
  )
}

export default Tile