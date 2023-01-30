import { Loader } from '@uncover/games-common'
import { useDataLoad } from 'lib/data'
import React, { useState } from 'react'

interface AppLoadingProperties {
}

const AppLoading = ({
}: AppLoadingProperties) => {

  // Hooks //

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

  }

  // Rendering //

  return (
    <>
    <Loader
      value={loadValue}
    />
    <button onClick={handleClick}>
      {loadCompleted}
    </button>
    </>
  )
}

export default AppLoading
