import React, { useEffect, useState } from 'react'
// Hooks
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
// Store
import GameSlice from 'store/game/game.slice'
// Libs
import {
  Loader,
  loadAudio,
  loadImages
} from '@uncover/games-common'
// Components
import { GameLayout } from 'components/common/game/GameLayout'

export interface GameLoadingProperties {
  audios: string[]
  images: string[]
}

export const GameLoading = ({
  audios,
  images
}: GameLoadingProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [loadValue, setLoadValue] = useState(0)
  const [loadCompleted, setLoadCompleted] = useState(false)

  let audioLoaded = 0
  let imageLoaded = 0
  const handleAudioProgress = () => {
    audioLoaded++
    handleProgress()
  }
  const handleImageProgress = () => {
    imageLoaded++
    handleProgress()
  }
  const handleProgress = () => {
    const value = Math.floor((audioLoaded + imageLoaded) * 100 / (images.length + audios.length))
    setLoadValue(value)
  }

  useEffect(() => {
    Promise.allSettled([
      loadAudio(audios, handleAudioProgress),
      loadImages(images, handleImageProgress),
    ])
      .then(() => {
        setLoadCompleted(true)
      })
  })

  useEffect(() => {
    if (loadCompleted) {
      setTimeout(() => dispatch(GameSlice.actions.gameReady()), 250)
    }
  }, [loadCompleted])

  // Rendering //

  return (
    <GameLayout
      content={
        <Loader
          text={t('LOADING')}
          value={loadValue}
        />
      }
    />
  )
}