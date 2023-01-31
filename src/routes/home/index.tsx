import React, { useEffect } from 'react'
// Libs
import CONFIG from 'config'
import {
  useAudioEffect,
  AudioCategories
} from '@uncover/games-common'
// Components
import { Navigate, Route, Routes } from 'react-router-dom'
import {
  Page,
  PageContent,
  PageMenu
} from '@uncover/games-common'
import { HomeMenuSettings } from '../../components/home/menu/HomeMenuSettings'
import { HomeMenu } from '../../components/home/menu/HomeMenu'
import { HomeContentSettingsAudio } from '../../components/home/content/settings/HomeContentSettingsAudio'
import { HomeContentSettingsDisplay } from '../../components/home/content/settings/HomeContentSettingsDisplay'
import { HomeContentSettingsGeneral } from '../../components/home/content/settings/HomeContentSettingsGeneral'
import { HomeContentCredits } from '../../components/home/content/credits/HomeContentCredits'
import { HomeContentPlay } from '../../components/home/content/play/HomeContentPlay'
import { useDispatch } from 'react-redux'
import GameSlice from 'store/game/game.slice'

const RouteHome = () => {

  // Hooks //

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GameSlice.actions.endGame())
  }, [])

  useAudioEffect([
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_0.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_1.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_2.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_3.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_4.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_5.mp3`
  ], {
    category: AudioCategories.MUSIC,
    shufffle: true,
    loop: true
  })

  // Rendering //

  return (
    <Page>

      <PageMenu>
        <Routes>
          <Route path='' element={<Navigate to='/play' replace={true} />} />
          <Route path='play' element={<HomeMenu />} />
          <Route path='settings'>
            <Route path='' element={<Navigate to='/settings/general' replace={true} />} />
            <Route path='general' element={<HomeMenuSettings />} />
            <Route path='audio' element={<HomeMenuSettings />} />
            <Route path='display' element={<HomeMenuSettings />} />
          </Route>
          <Route path='credits' element={<HomeMenu />} />
          <Route path='*' element={<Navigate to='/play' replace={true} />} />
        </Routes>
      </PageMenu>

      <PageContent>
        <Routes>
          <Route path='' element={<Navigate to='/play' replace={true} />} />
          <Route path='play' element={<HomeContentPlay />} />
          <Route path='settings'>
            <Route path='' element={<Navigate to='/settings/general' replace={true} />} />
            <Route path='general' element={<HomeContentSettingsGeneral />} />
            <Route path='audio' element={<HomeContentSettingsAudio />} />
            <Route path='display' element={<HomeContentSettingsDisplay />} />
          </Route>
          <Route path='credits' element={<HomeContentCredits />} />
          <Route path='*' element={<div />} />
        </Routes>
      </PageContent>

    </Page>
  )
}

export default RouteHome
