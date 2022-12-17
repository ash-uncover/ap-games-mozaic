import React from 'react'
import { useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
// Libs
import { GameBoardTile } from 'lib/game/board/tiles/tile.model'

import './Tile.css'

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
  const sizeWidth = useSelector(GameSelectors.sizeWidth)
  const sizeHeight = useSelector(GameSelectors.sizeHeight)

  // Events //

  const handleClick = () => {
    onClick()
  }

  // Rendering //

  const classes = ['tile']

  return (
    <button
      className={classes.join(' ')}
      onClick={handleClick}
    >
      {!hidden ?
        <>
          <img
            className='tile-image'
            src={background}
            width={`${sizeWidth * 100}%`}
            height={`${sizeHeight * 100}%`}
            draggable={false}
            style={{
              position: 'absolute',
              top: `-${baseY * 100}%`,
              left: `-${baseX * 100}%`,
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
      <div
        className='tile-layer'
      />
    </button>
  )
}

export default Tile