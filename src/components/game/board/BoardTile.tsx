import React, { MouseEvent, TouchEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Components
import Tile from './tile/Tile'

import './BoardTile.css'

const DRAG_INFO = {
  x: -1,
  y: -1,
  direction: null,
  target: null
}
const DRAG_DIRECTION = {
  TOP: 'top',
  LEFT: 'left',
  BOTTOM: 'bottom',
  RIGHT: 'right'
}

interface BoardTileProperties {
  tileId: string
}

const BoardTile = ({
  tileId
}: BoardTileProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const [dragMode, setDragMode] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  const tile = useSelector(GameSelectors.tile(tileId))
  const hiddenTileId = useSelector(GameSelectors.board).hiddenTile
  const hiddenTile = useSelector(GameSelectors.tile(hiddenTileId))

  // Events //

  const handleTouchStart = (event: TouchEvent) => {
    if (hiddenTile.x === tile.x - 1 && hiddenTile.y === tile.y) {
      DRAG_INFO.direction = DRAG_DIRECTION.LEFT
      DRAG_INFO.x = event.touches[0].clientX
      DRAG_INFO.target = event.touches[0].target
      startDrag()
    } else if (hiddenTile.x === tile.x + 1 && hiddenTile.y === tile.y) {
      DRAG_INFO.direction = DRAG_DIRECTION.RIGHT
      DRAG_INFO.x = event.touches[0].clientX
      DRAG_INFO.target = event.touches[0].target
      startDrag()
    } else if (hiddenTile.y === tile.y - 1 && hiddenTile.x === tile.x) {
      DRAG_INFO.direction = DRAG_DIRECTION.TOP
      DRAG_INFO.y = event.touches[0].clientY
      DRAG_INFO.target = event.touches[0].target
      startDrag()
    } else if (hiddenTile.y === tile.y + 1 && hiddenTile.x === tile.x) {
      DRAG_INFO.direction = DRAG_DIRECTION.BOTTOM
      DRAG_INFO.y = event.touches[0].clientY
      DRAG_INFO.target = event.touches[0].target
      startDrag()
    }
  }

  const startDrag = () => {
    document.addEventListener('touchend', stopDrag)
    document.addEventListener('touchcancel', stopDrag)
    document.addEventListener('touchmove', doDrag)
  }

  const doDrag = (event) => {
    setDragMode(true)
    switch (DRAG_INFO.direction) {
      case DRAG_DIRECTION.LEFT: {
        let offset = (event.touches[0].clientX - DRAG_INFO.x) / DRAG_INFO.target.offsetWidth
        offset = Math.max(-1, Math.min(0, offset))
        setOffsetX(offset)
        break
      }
      case DRAG_DIRECTION.RIGHT: {
        let offset = (event.touches[0].clientX - DRAG_INFO.x) / DRAG_INFO.target.offsetWidth
        offset = Math.max(0, Math.min(1, offset))
        setOffsetX(offset)
        break
      }
      case DRAG_DIRECTION.TOP: {
        let offset = (event.touches[0].clientY - DRAG_INFO.y) / DRAG_INFO.target.offsetHeight
        offset = Math.max(-1, Math.min(0, offset))
        setOffsetY(offset)
        break
      }
      case DRAG_DIRECTION.BOTTOM: {
        let offset = (event.touches[0].clientY - DRAG_INFO.y) / DRAG_INFO.target.offsetHeight
        offset = Math.max(0, Math.min(1, offset))
        setOffsetY(offset)
        break
      }
    }
  }

  const stopDrag = (event) => {
    setDragMode(false)
    let finalOffset = 0
    switch (DRAG_INFO.direction) {
      case DRAG_DIRECTION.LEFT: {
        finalOffset = (event.changedTouches[0].clientX - DRAG_INFO.x) / DRAG_INFO.target.offsetWidth
        finalOffset = Math.max(-1, Math.min(0, finalOffset))
        break
      }
      case DRAG_DIRECTION.RIGHT: {
        finalOffset = (event.changedTouches[0].clientX - DRAG_INFO.x) / DRAG_INFO.target.offsetWidth
        finalOffset = Math.max(0, Math.min(1, finalOffset))
        break
      }
      case DRAG_DIRECTION.TOP: {
        finalOffset = (event.changedTouches[0].clientY - DRAG_INFO.y) / DRAG_INFO.target.offsetHeight
        finalOffset = Math.max(-1, Math.min(0, finalOffset))
        break
      }
      case DRAG_DIRECTION.BOTTOM: {
        finalOffset = (event.changedTouches[0].clientY - DRAG_INFO.y) / DRAG_INFO.target.offsetHeight
        finalOffset = Math.max(0, Math.min(1, finalOffset))
        break
      }
    }
    document.removeEventListener('touchend', stopDrag)
    document.removeEventListener('touchcancel', stopDrag)
    document.removeEventListener('touchmove', doDrag)
    DRAG_INFO.x = -1
    DRAG_INFO.y = -1
    DRAG_INFO.direction = null
    DRAG_INFO.target = null
    if (finalOffset > 0.5 || finalOffset < -0.5) {
      dispatch(GameSlice.actions.clickTile({ tileId }))
    }
    setOffsetX(0)
    setOffsetY(0)
  }

  const handleTileClick = () => {
    dispatch(GameSlice.actions.clickTile({ tileId }))
  }

  // Rendering //

  if (tile.hidden) {
    return null
  }

  const computeTranslateX = () => {
    const result = (offsetX + tile.x - tile.baseX) * 100
    return result
  }

  const computeTranslateY = () => {
    return (offsetY + tile.y - tile.baseY) * 100
  }

  const classes = ['board-tile']
  if (dragMode) {
    classes.push('dragging')
  }

  return (
    <div
      className={classes.join(' ')}
      style={{
        transform: `translateX(${computeTranslateX()}%) translateY(${computeTranslateY()}%)`
      }}
      onTouchStart={handleTouchStart}
    >
      <Tile
        {...tile}
        onClick={handleTileClick}
      />
    </div>
  )
}

export default BoardTile