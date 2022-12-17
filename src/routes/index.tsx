import React from 'react'
import { Outlet } from 'react-router-dom'

import App from 'components/App'

const RouteRoot = () => {

  // Rendering //

  return (
    <App>
      <Outlet />
    </App>
  )
}

export default RouteRoot
