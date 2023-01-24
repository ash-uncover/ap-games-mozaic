import { DataManager } from '@uncover/games-common'

import CONFIG from 'config'

const Data = new DataManager(`${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/data/`)

export const loadData = async () => {
  return Promise.all([])
}
