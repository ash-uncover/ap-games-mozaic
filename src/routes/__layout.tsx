import React from 'react'

import {
  Route,
  Routes,
} from 'react-router-dom'

import RouteRoot from 'routes/index'
import RouteHome from 'routes/home/index'
import RouteGame from 'routes/game/index'
import RouteNotFound from 'routes/notfound'

import Audio from 'components/utils/Audio'

const Root = () => {

  // Rendering //

  return (
    <>
      <Routes>
        <Route path='/' element={<RouteRoot />}>
          <Route path='' element={<RouteHome />} />
          <Route path='game' element={<RouteGame />} />
          <Route path='*' element={<RouteNotFound />} />
        </Route>
      </Routes>
      <Audio />
    </>
  )
}

export default Root
