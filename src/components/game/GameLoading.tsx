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

export interface GameLoadingProperties {
}

export const GameLoading = ({
}: GameLoadingProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const theme = useSelector(GameSelectors.theme)

  const themes = useProviders('mozaic/theme')

  const [loadStatus, setLoadStatus] = useState(0)

  useEffect(() => {
    let images = []
    if (theme) {
      const themeObj = themes.find(t => t.name === theme)
      images = themeObj.attributes.images
    } else {
      images = themes.reduce((acc, theme) => {
        acc.push(...theme.attributes.images)
        return acc
      }, [])
    }
    loadImages(images, (value) => {
      setLoadStatus(value * 100 / images.length)
    })
      .then(() => {
        setTimeout(() => dispatch(GameSlice.actions.gameReady()), 250)
      })
  }, [])

  // Rendering //

  return (
    <GameLayout
      content={
        <Loader
          text={t('LOADING')}
          value={loadStatus}
        />
      }
    />
  )
}