import React, { useEffect, useState, TouchEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
// Store
import GameSelectors from 'store/game/game.selectors'
import GameSlice from 'store/game/game.slice'
// Libs
import Audio, { AudioFiles } from 'lib/utils/Audio'
import { AudioTypes, GridContainer } from '@uncover/games-common'
import { GameStatuses } from 'lib/game/constants'
// Components
import { Board } from 'components/game/board/Board'
import { DIALOG, Dialogs } from './dialogs/Dialogs'
import { GameFooterAction } from './GameFooterAction'
import { GameHeader } from './GameHeader'
import { Navigate } from 'react-router-dom'

import './Game.css'
import { loadImages } from 'lib/utils/ImageLoader'

const dragInfo = {
  target: null,
  x: -1,
}
const DRAG_THRESHOLD = 0.25

const Game = ({ }) => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [animationMode, setAnimationMode] = useState(null)
  const [offsetX, setOffsetX] = useState(0)

  const [reveal, setReveal] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const status = useSelector(GameSelectors.status)
  const size = useSelector(GameSelectors.size)
  const background = useSelector(GameSelectors.background)
  const backgrounds = useSelector(GameSelectors.backgrounds)

  let backgroundPrevious = null
  let backgroundNext = null
  if (backgrounds?.length) {
    const backgroundIndex = backgrounds.indexOf(background)
    backgroundPrevious = backgrounds[(backgroundIndex + backgrounds.length - 1) % backgrounds.length]
    backgroundNext = backgrounds[(backgroundIndex + 1) % backgrounds.length]
  }

  useEffect(() => {
    return Audio.play(
      AudioFiles.game,
      AudioTypes.MUSIC
    )
  }, [])

  useEffect(() => {
    setLoaded(false)
    loadImages(backgrounds).then(() => setLoaded(true))
  }, [backgrounds])

  // Events //

  const handleTouchStart = (event: TouchEvent) => {
    dragInfo.x = event.touches[0].clientX
    dragInfo.target = event.touches[0].target
    startDrag()
  }

  const startDrag = () => {
    document.addEventListener('touchend', stopDrag)
    document.addEventListener('touchcancel', stopDrag)
    document.addEventListener('touchmove', doDrag)
  }

  const doDrag = (event) => {
    let offset = (event.touches[0].clientX - dragInfo.x) / dragInfo.target.offsetWidth
    offset = Math.max(-1, Math.min(1, offset))
    setOffsetX(offset)
  }

  const stopDrag = (event) => {
    let finalOffset = 0
    finalOffset = (event.changedTouches[0].clientX - dragInfo.x) / dragInfo.target.offsetWidth
    finalOffset = Math.max(-1, Math.min(1, finalOffset))
    document.removeEventListener('touchend', stopDrag)
    document.removeEventListener('touchcancel', stopDrag)
    document.removeEventListener('touchmove', doDrag)
    dragInfo.x = -1
    if (finalOffset > DRAG_THRESHOLD) {
      setAnimationMode('animate-previous')
    } else if (finalOffset < -DRAG_THRESHOLD) {
      setAnimationMode('animate-next')
    }
    setOffsetX(0)
  }

  const handleAnimatioEnd = () => {
    switch (animationMode) {
      case 'animate-previous': {
        dispatch(GameSlice.actions.previousImage())
        break
      }
      case 'animate-next': {
        dispatch(GameSlice.actions.nextImage())
        break
      }
    }
    setAnimationMode(null)
  }

  const handleStart = () => {
    dispatch(GameSlice.actions.startGame())
  }

  const handleChangeImage = () => {
    dispatch(GameSlice.actions.nextImage())
  }

  const handleToggleView = () => {
    setReveal(!reveal)
  }

  const handleEndMenu = () => {
    dispatch(GameSlice.actions.openDialog({ dialog: DIALOG.DEFEAT }))
  }

  const handleVictoryMenu = () => {
    dispatch(GameSlice.actions.openDialog({ dialog: DIALOG.VICTORY }))
  }

  // Rendering //

  if (status === GameStatuses.GAME_NOT_STARTED) {
    return (
      <Navigate to='/' />
    )
  }

  if (!loaded) {
    return (
      <div>LOADING</div>
    )
  }

  const buildFooterActions = () => {
    const result = []
    switch (status) {
      case GameStatuses.GAME_READY: {
        result.push(
          <GameFooterAction
            key='start'
            selected={true}
            title={t('game.start.text')}
            onClick={handleStart}
          />
        )
        if (backgrounds.length > 1) {
          result.push(
            <GameFooterAction
              key='change'
              title={t('game.change.text')}
              onClick={handleChangeImage}
            />
          )
        }
        break
      }
      case GameStatuses.GAME_ON_GOING: {
        result.push(
          <GameFooterAction
            key='reveal'
            icon={['fas', 'eye']}
            selected={reveal}
            title=''
            onClick={handleToggleView}
          />
        )
        result.push(
          <GameFooterAction
            key='quit'
            icon={['fas', 'door-open']}
            title=''
            onClick={handleEndMenu}
          />
        )
        break
      }
      case GameStatuses.GAME_ENDED_VICTORY: {
        result.push(
          <GameFooterAction
            key='victory'
            icon={['fas', 'door-open']}
            title=''
            onClick={handleVictoryMenu}
          />
        )
        break
      }
    }
    return result;
  }

  const getBackground = () => {
    switch (animationMode) {
      case 'animate-previous': return backgroundPrevious
      case 'animate-next': return backgroundNext
      default: return background
    }
  }

  const classes = ['game']
  if (animationMode) {
    classes.push(animationMode)
  }

  return (
    <div
      className={classes.join(' ')}
      onTransitionEnd={handleAnimatioEnd}
    >

      <GameHeader />

      <div className='game-area'>
        {status === GameStatuses.GAME_ON_GOING ?
          <Board />
          : null}

        {status === GameStatuses.GAME_READY ?
          <GridContainer
            className='previous'
            width={size.width}
            height={size.height}
          >
            <img src={backgroundPrevious} />
          </GridContainer>
          : null}

        {reveal || status === GameStatuses.GAME_READY || status === GameStatuses.GAME_ENDED_VICTORY ?
          <GridContainer
            width={size.width}
            height={size.height}
          >
            <img
              style={{
                transform: `translateX(${offsetX * 100}%)`
              }}
              src={getBackground()}
              onTouchStart={status === GameStatuses.GAME_READY ? handleTouchStart : null}
            />
          </GridContainer>
          : null}

        {status === GameStatuses.GAME_READY ?
          <GridContainer
            className='next'
            width={size.width}
            height={size.height}
          >
            <img src={backgroundNext} />
          </GridContainer>
          : null}

      </div>

      <div className='game-footer'>
        {buildFooterActions()}
      </div>

      <Dialogs />
    </div>
  )
}

export default Game