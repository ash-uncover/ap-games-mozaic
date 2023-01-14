import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

import {
  BrowserRouter,
  HashRouter,
} from 'react-router-dom'

// Import translation module
import 'lib/utils/i18n'

// Import icons
import 'lib/utils/icons'

// Should be imported before first access to the reducers
import store from 'store'

// Import components
import Root from 'routes/__layout'

import { ShortcutManager } from '@uncover/games-common'
import CONFIG from 'config'
import { WardProvider } from '@uncover/ward-react'
import { PluginManager } from '@uncover/ward'
ShortcutManager.reset()

let Router = BrowserRouter
if (CONFIG.AP_GAMES_MOZAIC_ENVIRONMENT === 'github') {
  Router = HashRouter
}

PluginManager.loadPlugin(CONFIG.AP_GAMES_MOZAIC_PLUGIN)

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)

root.render(
  <Suspense fallback="loading">
    <WardProvider plugin={CONFIG.AP_GAMES_MOZAIC_PLUGIN}>
      <Provider store={store}>
        <Router>
          <Root />
        </Router>
      </Provider>
    </WardProvider>
  </Suspense>
)
