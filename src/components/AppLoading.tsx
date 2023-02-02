import React, { useState } from 'react'
// Hooks
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  useWardProviders,
  useWardLoaded
} from '@uncover/ward-react'
// Store
import AppSlice from 'store/app/app.slice'
import { AppLoadStatuses } from 'store/app/app.state'
// Libs
import CONFIG from 'config'
// Components
import { Loader, useLoadData } from '@uncover/games-common'
import { LoadIndicator } from './common/LoadIndicator'

interface AppLoadingProperties {
}

const AppLoading = ({
}: AppLoadingProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [loadValue, setLoadValue] = useState(0)
  const [loadCompleted, setLoadCompleted] = useState(false)

  const handleLoadProgress = (value: number) => {
    setLoadValue(value)
  }

  const handleLoadCompleted = () => {
    setLoadCompleted(true)
  }

  const wardLoaded = useWardLoaded()
  const themes = useWardProviders('mozaic/theme')

  const audios = [
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/click.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/gong.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_0.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_0.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_1.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_2.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_3.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_4.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_5.mp3`
  ]

  const images = themes.map((theme: any) => {
    return theme.attributes.thumbnail
  })

  useLoadData(
    {
      audios,
      images,
      delayed: wardLoaded
    },
    handleLoadProgress,
    handleLoadCompleted
  )

  // Events //

  const handleClick = () => {
    if (loadCompleted) {
      dispatch(AppSlice.actions.setLoadStatus(AppLoadStatuses.STARTED))
    }
  }

  // Rendering //

  return (
    <Loader
      value={loadValue}
      onClick={handleClick}
    >
      <div
        style={{
          width: '12rem',
          margin: '0 -1rem',
          height: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
        {loadCompleted ? t('app.start') : <LoadIndicator />}
      </div>
    </Loader>
  )
}

export default AppLoading
