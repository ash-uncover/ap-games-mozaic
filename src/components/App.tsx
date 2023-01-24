import React, { useEffect, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AppSelectors from 'store/app/app.selectors'
import AppSlice from 'store/app/app.slice'
// Libs
import { loadData } from 'lib/data'
import MessageServiceCentral from 'services/message.service'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppLoadStatuses } from 'store/app/app.state'
import { Display } from './common/display/Display'

interface AppProperties {
  children: ReactElement
}

const App = ({
  children
}: AppProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const { t, i18n } = useTranslation()

  const query = useQuery()
  const loadStatus = useSelector(AppSelectors.loadStatus)

  const language = useSelector(AppSelectors.language)

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  useEffect(() => {
    const embedded = query.has('embedded')
    if (embedded) {
      dispatch(AppSlice.actions.setEmbedded({ embedded: query.has('embedded') }))
      return MessageServiceCentral.init(dispatch)
    }
  }, [])

  useEffect(() => {
    loadData()
      .then(() => {
        dispatch(AppSlice.actions.setLoadStatus(AppLoadStatuses.STARTED))
      })
  }, [])

  // Rendering //

  switch (loadStatus) {
    case AppLoadStatuses.NONE:
    case AppLoadStatuses.LOADING: {
      return (
        <Display className='app'>
          {t('LOADING')}
        </Display>
      )
    }
    case AppLoadStatuses.READY: {
      return (
        <Display className='app'>
          {t('LOADING')}
        </Display>
      )
    }
    case AppLoadStatuses.STARTED: {
      return (
        <Display className='app'>
          {children}
        </Display>
      )
    }
  }
}

const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

export default App