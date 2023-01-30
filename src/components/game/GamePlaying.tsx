import React, { useState } from 'react'
// Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useProvider } from '@uncover/ward-react'
// Store
import GameSlice from 'store/game/game.slice'
import GameSelectors from 'store/game/game.selectors'
// Libs
import {
  AudioCategories,
  useAudioEffect
} from '@uncover/games-common-audio'
// Components
import { GameLayout } from 'components/common/game/GameLayout'
import { Board } from './board/Board'
import { GameFooterAction } from 'components/common/game/GameFooterAction'
import { DIALOG } from './dialogs/Dialogs'
import { GridContainer } from '@uncover/games-common'

export interface GamePlayingProperties {
  audios: string[]
}

export const GamePlaying = ({
  audios
}: GamePlayingProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const [reveal, setReveal] = useState(false)

  const theme = useSelector(GameSelectors.theme)
  const size = useSelector(GameSelectors.size)
  const background = useSelector(GameSelectors.background)

  const themeObj = useProvider(theme)

  useAudioEffect(audios, {
    category: AudioCategories.MUSIC,
    shufffle: true,
    loop: true
  })

  // Events //

  const handleToggleView = () => {
    setReveal(!reveal)
  }

  const handleEndMenu = () => {
    dispatch(GameSlice.actions.openDialog({ dialog: DIALOG.DEFEAT }))
  }

  // Rendering //

  return (
    <GameLayout
      header={`Mozaic - ${themeObj ? themeObj.attributes.name : 'Random'}`}
      content={
        reveal ?
          <GridContainer
            className='image-preview'
            width={size.width}
            height={size.height}
          >
            <img
              src={background}
            />
          </GridContainer>
          :
          <Board />
      }
      footer={[
        <GameFooterAction
          key='reveal'
          icon={['fas', 'eye']}
          selected={reveal}
          title=''
          onClick={handleToggleView}
        />,
        <GameFooterAction
          key='quit'
          icon={['fas', 'door-open']}
          title=''
          onClick={handleEndMenu}
        />
      ]}
    />
  )
}