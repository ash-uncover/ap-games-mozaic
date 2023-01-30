import React, { useState } from 'react'
// Hooks
import { useDataLoad } from 'lib/data'
import { useDispatch } from 'react-redux'
// Store
import AppSlice from 'store/app/app.slice'
import { AppLoadStatuses } from 'store/app/app.state'
// Libs
// Components
import { Loader } from '@uncover/games-common'
import { useTranslation } from 'react-i18next'

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

  useDataLoad(handleLoadProgress, handleLoadCompleted)

  // Events //

  const handleClick = () => {
    if (loadCompleted) {
      dispatch(AppSlice.actions.setLoadStatus(AppLoadStatuses.STARTED))
    }
  }

  // Rendering //

  return (
    <Loader
      text={loadCompleted ? t('app.start') : t('LOADING')}
      value={loadValue}
      onClick={handleClick}
    />
  )
}

export default AppLoading
