import React from 'react'
import { useTranslation } from 'react-i18next'
// Components
import { Panel } from '@uncover/games-common'

export const HomeContentCredits = () => {

  // Hooks //

  const { t } = useTranslation()

  // Events //

  // Rendering //

  return (
    <>
      <Panel>
        <h2>
        {t('home.credits.title')}
        </h2>
      </Panel>

      <Panel title={t('home.credits.art.title')}>
        <p>To Be Done</p>
      </Panel>
    </>
  )
}