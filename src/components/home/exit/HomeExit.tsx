import React from 'react'
import { useDispatchMessage } from 'services/message.service'

export const HomeExit = () => {

  // Hooks //

  const dispatchMessage = useDispatchMessage()

  dispatchMessage({ type: 'exitGame', payload: null })

  // Rendering //

  return null
}