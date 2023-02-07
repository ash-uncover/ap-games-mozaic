import React, { useEffect, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Store
import AppSelectors from 'store/app/app.selectors'
import AppSlice from 'store/app/app.slice'
// Libs
import { useWardService } from '@uncover/ward-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppLoadStatuses } from 'store/app/app.state'
import { Display } from './common/display/Display'
// Components
import AppLoading from './AppLoading'

interface AppProperties {
  children: ReactElement
}

const App = ({
  children
}: AppProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { i18n } = useTranslation()

  const query = useQuery()
  const loadStatus = useSelector(AppSelectors.loadStatus)

  const language = useSelector(AppSelectors.language)

  useWardService(dispatch)

  useEffect(() => {
    navigate('/')
  }, [])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  useEffect(() => {
    dispatch(AppSlice.actions.setEmbedded({ embedded: query.has('embedded') }))
  }, [])

  // Rendering //

  switch (loadStatus) {
    case AppLoadStatuses.NONE:
    case AppLoadStatuses.LOADING:
    case AppLoadStatuses.READY: {
      return (
        <Display className='app'>
          <AppLoading />
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