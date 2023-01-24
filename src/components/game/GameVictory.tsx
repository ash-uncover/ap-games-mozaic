import React from 'react'
// Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useProvider } from '@uncover/ward-react'
// Store
import GameSlice from 'store/game/game.slice'
import GameSelectors from 'store/game/game.selectors'
// Libs
// Components
import { DIALOG } from './dialogs/Dialogs'
import { GameLayout } from 'components/common/game/GameLayout'
import { GameFooterAction } from 'components/common/game/GameFooterAction'
import { GridContainer } from '@uncover/games-common'

export interface GameVictoryProperties {
}

export const GameVictory = ({
}: GameVictoryProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const size = useSelector(GameSelectors.size)
  const background = useSelector(GameSelectors.background)

  const theme = useSelector(GameSelectors.theme)
  const themeObj = useProvider(`mozaic/theme/${theme}`)

  // Events //

  const handleVictoryMenu = () => {
    dispatch(GameSlice.actions.openDialog({ dialog: DIALOG.VICTORY }))
  }

  // Rendering //

  return (
    <GameLayout
      header={`Mozaic - ${themeObj ? themeObj.name : 'Random'}`}
      content={
        <GridContainer
          width={size.width}
          height={size.height}
        >
          <img
            src={background}
          />
        </GridContainer>
      }
      footer={
        <GameFooterAction
          key='victory'
          icon={['fas', 'door-open']}
          title=''
          onClick={handleVictoryMenu}
        />
      }
    />
  )
}