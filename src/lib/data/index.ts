import { DataManager } from '@uncover/games-common'

import CONFIG from 'config'

import { Card, CardsData } from './card.helper'

export const Cards: { [key: string]: Card } = {}

const Data = new DataManager(`${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/data/`)

export const loadData = async () => {
  return Promise.all([])
}
