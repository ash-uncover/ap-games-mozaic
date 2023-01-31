import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RouteHome from 'routes/home/index'
import RouteGame from 'routes/game/index'
import App from 'components/App'

const RouteRoot = () => {

  // Rendering //

  return (
    <App>
      <Routes>
        <Route path='game' element={<RouteGame />} />
        <Route path='*' element={<RouteHome />} />
      </Routes>
    </App >
  )
}

export default RouteRoot
