import React, { useEffect, useState } from 'react'
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
import ImageSlider from '../common/image-slider/ImageSlider'

import './Game.css'
import { loadImages } from 'lib/utils/ImageLoader'
import { Loader } from 'components/common/loader/Loader'


const Game = ({ }) => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [reveal, setReveal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [loadStatus, setLoadStatus] = useState(0)

  const status = useSelector(GameSelectors.status)
  const size = useSelector(GameSelectors.size)

  const background = useSelector(GameSelectors.background)
  const backgrounds = useSelector(GameSelectors.backgrounds)

  useEffect(() => {
    return Audio.play(
      AudioFiles.game,
      AudioTypes.MUSIC
    )
  }, [])

  useEffect(() => {
    setLoaded(false)
    loadImages(backgrounds, setLoadStatus).then(() => setTimeout(() => setLoaded(true), 250))
  }, [backgrounds])

  // Events //

  const handlePreviousBackground = () => {
    dispatch(GameSlice.actions.previousImage())
  }

  const handleNextBackground = () => {
    dispatch(GameSlice.actions.nextImage())
  }

  const handleStart = () => {
    dispatch(GameSlice.actions.startGame())
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
      <Loader
        text={t('LOADING')}
        value={loadStatus}
      />
    )
  }

  const buildFooterActions = () => {
    const result = []
    switch (status) {
      case GameStatuses.GAME_READY: {
        if (backgrounds.length > 1) {
          result.push(
            <GameFooterAction
              key='previous'
              title={t('game.previous.text')}
              icon={['fas', 'chevron-left']}
              onClick={handlePreviousBackground}
            />
          )
        }
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
              key='next'
              title={t('game.next.text')}
              icon={['fas', 'chevron-right']}
              onClick={handleNextBackground}
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

  const classes = ['game']

  return (
    <div
      className={classes.join(' ')}
    >

      <GameHeader />

      <div className='game-area'>
        {status === GameStatuses.GAME_ON_GOING ?
          <Board />
          : null}

        {reveal || status === GameStatuses.GAME_ENDED_VICTORY ?
          <GridContainer
            width={size.width}
            height={size.height}
          >
            <img
              src={background}
            />
          </GridContainer>
          : null}

        {status === GameStatuses.GAME_READY ?
          <GridContainer
            width={size.width}
            height={size.height}
          >
            <ImageSlider
              image={background}
              onChangePrevious={handlePreviousBackground}
              onChangeNext={handleNextBackground}
            />
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