import React from 'react'
import { useLocation } from 'react-router-dom'

const NotFoundRoute = () => {

  // Hooks //

  const location = useLocation()

  // Rendering //

  return (
    <>
      <div>
        NOT FOUND
      </div>
      <div>
        {`${JSON.stringify(location)}`}
      </div>
    </>
  )
}

export default NotFoundRoute