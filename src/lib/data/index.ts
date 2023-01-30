import { loadAudio, loadImages } from '@uncover/games-common'
import {
  useWardProviders,
  useWardLoaded
} from '@uncover/ward-react'

import CONFIG from 'config'
import { useEffect } from 'react'

export const useDataLoad = (
  onProgress: (value: number) => void,
  onLoaded: () => void
) => {

  const wardLoaded = useWardLoaded()
  const themes = useWardProviders('mozaic/theme')

  const audios = [
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_0.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_1.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_2.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_3.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_4.mp3`,
    `${CONFIG.AP_GAMES_MOZAIC_PUBLIC}/sound/music_5.mp3`
  ]

  const images = themes.map(theme => {
    return theme.attributes.thumbnail
  })

  let audioLoaded = 0
  let imageLoaded = 0
  const handleAudioProgress = () => {
    audioLoaded++
    handleProgress()
  }
  const handleImageProgress = () => {
    imageLoaded++
    handleProgress()
  }
  const handleProgress = () => {
    onProgress(10 + Math.floor((audioLoaded + imageLoaded) * 90 / ((audios.length + images.length))))
  }

  useEffect(() => {
    if (wardLoaded) {
      onProgress(10)
      Promise.allSettled([
        loadAudio(audios, handleAudioProgress),
        loadImages(images, handleImageProgress),
      ])
        .then(() => {
          onLoaded()
        })
    }
  }, [wardLoaded])
}
