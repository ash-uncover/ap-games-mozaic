import React, { useEffect, useState } from 'react'
// Hooks
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
// Store
import GameSlice from 'store/game/game.slice'
// Libs
import {
  Loader,
  useLoadData
} from '@uncover/games-common'
// Components
import { GameLayout } from 'components/common/game/GameLayout'
import { LoadIndicator } from 'components/common/LoadIndicator'

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

  const handleLoadProgress = (value: number) => {
    setLoadValue(value)
  }

  const handleLoadCompleted = () => {
    setLoadCompleted(true)
  }

  useLoadData(
    { images, audios },
    handleLoadProgress,
    handleLoadCompleted
  )

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
          value={loadValue}
        >
          <div
            style={{
              width: '10rem',
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
            <LoadIndicator />
          </div>
        </Loader>
      }
    />
  )
}