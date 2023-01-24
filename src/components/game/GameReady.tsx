import React, { useEffect, useState } from 'react'
// Hooks
import { useProvider, useProviders } from '@uncover/ward-react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// Store
import GameSlice from 'store/game/game.slice'
import GameSelectors from 'store/game/game.selectors'
// Libs
import { ArrayUtils } from '@uncover/js-utils'
// Components
import { GridContainer, ImageSlider } from '@uncover/games-common'
import { GameFooterAction } from '../common/game/GameFooterAction'
import { GameLayout } from 'components/common/game/GameLayout'

export interface GameReadyProperties {

}

export const GameReady = ({

}: GameReadyProperties) => {

  // Hooks //

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const size = useSelector(GameSelectors.size)

  const [background, setBackground] = useState<string>()
  const [backgrounds, setBackgrounds] = useState<string[]>([])

  const theme = useSelector(GameSelectors.theme)

  const themeObj = useProvider(theme)
  const themes = useProviders('mozaic/theme')

  useEffect(() => {
    let newBackgrounds = []
    if (themeObj) {
      newBackgrounds = themeObj.attributes.images
    } else {
      newBackgrounds = themes.reduce((acc, theme) => {
        acc.push(...theme.attributes.images)
        return acc
      }, [])
    }
    newBackgrounds = ArrayUtils.shuffle(newBackgrounds)
    setBackground(ArrayUtils.randomElement(newBackgrounds))
    setBackgrounds(newBackgrounds)
  }, [themeObj])

  // Events //

  const handlePreviousBackground = () => {
    const index = backgrounds.indexOf(background)
    const newIndex = (index + backgrounds.length - 1) % backgrounds.length
    setBackground(backgrounds[newIndex])
  }

  const handleNextBackground = () => {
    const index = backgrounds.indexOf(background)
    const newIndex = (index + 1) % backgrounds.length
    setBackground(backgrounds[newIndex])
  }

  const handleSelectBackground = () => {
    dispatch(GameSlice.actions.gameStart({ background }))
  }

  // Rendering //

  return (
    <GameLayout
    header={`Mozaic - ${themeObj ? themeObj.attributes.name : 'Random'}`}
      content={
        <GridContainer
          width={size.width}
          height={size.height}
        >
          <ImageSlider
            image={background}
            onChangePrevious={handlePreviousBackground}
            onChangeNext={handleNextBackground}
          />
        </GridContainer>
      }
      footer={[
        <GameFooterAction
          key='previous'
          title={t('game.previous.text')}
          icon={['fas', 'chevron-left']}
          onClick={handlePreviousBackground}
        />,
        <GameFooterAction
          key='start'
          selected={true}
          title={t('game.start.text')}
          onClick={handleSelectBackground}
        />,
        <GameFooterAction
          key='next'
          title={t('game.next.text')}
          icon={['fas', 'chevron-right']}
          onClick={handleNextBackground}
        />
      ]}
    />
  )
}