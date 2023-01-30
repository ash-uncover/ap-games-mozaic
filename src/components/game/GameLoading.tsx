import React, { useEffect, useState } from 'react'
// Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useProviders } from '@uncover/ward-react'
// Store
import GameSlice from 'store/game/game.slice'
import GameSelectors from 'store/game/game.selectors'
// Libs
import { loadImages } from 'lib/utils/ImageLoader'
// Components
import { Loader } from '@uncover/games-common'
import { GameLayout } from 'components/common/game/GameLayout'
import { useAudioLoad } from '@uncover/games-common-audio'

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

  const [loadStatus, setLoadStatus] = useState(0)
  const [imageLoadStatus, setImageLoadStatus] = useState(false)
  const [audioLoadStatus, setAudioLoadStatus] = useState(false)

  useAudioLoad(audios, (value) => {
    setLoadStatus(value => value + 1)
    if (value === audios.length) {
      setAudioLoadStatus(true)
    }
  })

  useEffect(() => {
    loadImages(images, (v) => {
      setLoadStatus(value => value + 1)
    })
      .then(() => {
        setImageLoadStatus(true)
      })
  }, [])

  const value = Math.floor(loadStatus * 100 / (images.length + audios.length))
  console.log(loadStatus + ' - ' + value)


  useEffect(() => {
    if (imageLoadStatus && audioLoadStatus) {
      setTimeout(() => dispatch(GameSlice.actions.gameReady()), 250)
    }
  }, [imageLoadStatus, audioLoadStatus])

  // Rendering //

  return (
    <GameLayout
      content={
        <Loader
          text={t('LOADING')}
          value={value}
        />
      }
    />
  )
}