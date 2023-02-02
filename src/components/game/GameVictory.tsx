import React, { useEffect, useState } from 'react'
// Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useWardProvider } from '@uncover/ward-react'
// Store
import GameSlice from 'store/game/game.slice'
import GameSelectors from 'store/game/game.selectors'
// Libs
// Components
import { DIALOG } from './dialogs/Dialogs'
import { GameLayout } from 'components/common/game/GameLayout'
import { GameFooterAction } from 'components/common/game/GameFooterAction'
import { GridContainer, useAudioEffect } from '@uncover/games-common'
import { Board } from './board/Board'
import CONFIG from 'config'

import './GameVictory.css'

let victoryTimeout

export interface GameVictoryProperties {
}

export const GameVictory = ({
}: GameVictoryProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const [animate, setAnimate] = useState(false)
  const [once, setOnce] = useState(true)

  const size = useSelector(GameSelectors.size)
  const background = useSelector(GameSelectors.background)

  const theme = useSelector(GameSelectors.theme)
  const themeObj = useWardProvider(`mozaic/theme/${theme}`)

  useAudioEffect([
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/gong.mp3`,
  ])

  useEffect(() => {
    setAnimate(true)
    victoryTimeout = setTimeout(() => {
      handleVictoryMenuOnce()
    }, 3000)
  }, [])

  // Events //

  const handleVictoryMenuOnce = () => {
    clearTimeout(victoryTimeout)
    if (once) {
      setOnce(false)
      handleVictoryMenu()
    }
  }

  const handleVictoryMenu = () => {
    dispatch(GameSlice.actions.openDialog({ dialog: DIALOG.VICTORY }))
  }

  // Rendering //

  const classes = ['game-victory']
  if (animate) {
    classes.push('animate')
  }

  return (
    <GameLayout
      className={classes.join(' ')}
      header={`Mozaic - ${themeObj ? themeObj.name : 'Random'}`}
      content={
        <>
          <Board />
          <GridContainer
            className='image-preview'
            width={size.width}
            height={size.height}
          >
            <img
              style={{
                borderRadius: '0.5rem',
                width: '100%',
                objectFit: 'cover',
                height: '100%'
              }}
              src={background}
              onClick={handleVictoryMenuOnce}
            />
          </GridContainer>
        </>
      }
      footer={
        <GameFooterAction
          icon={['fas', 'door-open']}
          title=''
          onClick={handleVictoryMenu}
        />
      }
    />
  )
}