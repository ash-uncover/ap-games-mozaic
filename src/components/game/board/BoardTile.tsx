import React, { TouchEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Libs
import CONFIG from 'config'
import {
  useAudio,
  AudioCategories
} from '@uncover/games-common'
// Components
import BoardTileInner from './tile/BoardTileInner'

import './BoardTile.css'

const dragInfo = {
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
const DRAG_THRESHOLD = 0.25

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

  const audioTap = useAudio([
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/click.mp3`
  ], {
    category: AudioCategories.GAME
  })

  // Events //

  const handleTouchStart = (event: TouchEvent) => {
    if (hiddenTile.x === tile.x - 1 && hiddenTile.y === tile.y) {
      dragInfo.direction = DRAG_DIRECTION.LEFT
      dragInfo.x = event.touches[0].clientX
      dragInfo.target = event.touches[0].target
      startDrag()
    } else if (hiddenTile.x === tile.x + 1 && hiddenTile.y === tile.y) {
      dragInfo.direction = DRAG_DIRECTION.RIGHT
      dragInfo.x = event.touches[0].clientX
      dragInfo.target = event.touches[0].target
      startDrag()
    } else if (hiddenTile.y === tile.y - 1 && hiddenTile.x === tile.x) {
      dragInfo.direction = DRAG_DIRECTION.TOP
      dragInfo.y = event.touches[0].clientY
      dragInfo.target = event.touches[0].target
      startDrag()
    } else if (hiddenTile.y === tile.y + 1 && hiddenTile.x === tile.x) {
      dragInfo.direction = DRAG_DIRECTION.BOTTOM
      dragInfo.y = event.touches[0].clientY
      dragInfo.target = event.touches[0].target
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
    switch (dragInfo.direction) {
      case DRAG_DIRECTION.LEFT: {
        let offset = (event.touches[0].clientX - dragInfo.x) / dragInfo.target.offsetWidth
        offset = Math.max(-1, Math.min(0, offset))
        setOffsetX(offset)
        break
      }
      case DRAG_DIRECTION.RIGHT: {
        let offset = (event.touches[0].clientX - dragInfo.x) / dragInfo.target.offsetWidth
        offset = Math.max(0, Math.min(1, offset))
        setOffsetX(offset)
        break
      }
      case DRAG_DIRECTION.TOP: {
        let offset = (event.touches[0].clientY - dragInfo.y) / dragInfo.target.offsetHeight
        offset = Math.max(-1, Math.min(0, offset))
        setOffsetY(offset)
        break
      }
      case DRAG_DIRECTION.BOTTOM: {
        let offset = (event.touches[0].clientY - dragInfo.y) / dragInfo.target.offsetHeight
        offset = Math.max(0, Math.min(1, offset))
        setOffsetY(offset)
        break
      }
    }
  }

  const stopDrag = (event) => {
    setDragMode(false)
    let finalOffset = 0
    switch (dragInfo.direction) {
      case DRAG_DIRECTION.LEFT: {
        finalOffset = (event.changedTouches[0].clientX - dragInfo.x) / dragInfo.target.offsetWidth
        finalOffset = Math.max(-1, Math.min(0, finalOffset))
        break
      }
      case DRAG_DIRECTION.RIGHT: {
        finalOffset = (event.changedTouches[0].clientX - dragInfo.x) / dragInfo.target.offsetWidth
        finalOffset = Math.max(0, Math.min(1, finalOffset))
        break
      }
      case DRAG_DIRECTION.TOP: {
        finalOffset = (event.changedTouches[0].clientY - dragInfo.y) / dragInfo.target.offsetHeight
        finalOffset = Math.max(-1, Math.min(0, finalOffset))
        break
      }
      case DRAG_DIRECTION.BOTTOM: {
        finalOffset = (event.changedTouches[0].clientY - dragInfo.y) / dragInfo.target.offsetHeight
        finalOffset = Math.max(0, Math.min(1, finalOffset))
        break
      }
    }
    document.removeEventListener('touchend', stopDrag)
    document.removeEventListener('touchcancel', stopDrag)
    document.removeEventListener('touchmove', doDrag)
    dragInfo.x = -1
    dragInfo.y = -1
    dragInfo.direction = null
    dragInfo.target = null
    if (finalOffset > DRAG_THRESHOLD || finalOffset < -DRAG_THRESHOLD) {
      audioTap.stop()
      audioTap.play()
      dispatch(GameSlice.actions.clickTile({ tileId }))
    }
    setOffsetX(0)
    setOffsetY(0)
  }

  const handleTileClick = () => {
    audioTap.stop()
    audioTap.play()
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
    const result = (offsetY + tile.y - tile.baseY) * 100
    return result
  }

  const classes = ['board-tile']
  if (dragMode) {
    classes.push('dragging')
  }

  return (
    <div
      className={classes.join(' ')}
      style={{
        transform: `translateX(${computeTranslateX()}%) translateY(${computeTranslateY()}%) translateZ(0)`
      }}
      onTouchStart={handleTouchStart}
    >
      <BoardTileInner
        {...tile}
        onClick={handleTileClick}
      />
    </div>
  )
}

export default BoardTile