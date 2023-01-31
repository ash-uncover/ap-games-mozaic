import React, { ReactNode, useEffect } from 'react'
// Hooks
import { useDispatch } from 'react-redux'
import { AudioCategories, useAudioEffect } from '@uncover/games-common'
// Store
import GameSlice from '../../store/game/game.slice'
// Libs
import CONFIG from 'config'

interface HomeProperties {
  children: ReactNode
}

export const Home = ({
  children
}: HomeProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GameSlice.actions.endGame())
  }, [])

  useAudioEffect([
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_0.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_1.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_2.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_3.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_4.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_5.mp3`
  ], {
    category: AudioCategories.MUSIC,
    shufffle: true,
    loop: true
  })

  // Rendering //

  return (
    <>
      {children}
    </>
  )
}
