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
import DisplaySelectors from 'store/display/display.selectors'

interface AppProperties {
  children: ReactElement
}

const App = ({
  children
}: AppProperties) => {

  // Hooks //

  const dispatch = useDispatch()

  const { t, i18n } = useTranslation()

  const brightness = useSelector(DisplaySelectors.brightness)
  const contrast = useSelector(DisplaySelectors.contrast)

  const query = useQuery()
  const loaded = useSelector(AppSelectors.loaded)

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
      .then(() => dispatch(AppSlice.actions.setLoaded(true)))
  }, [])

  // Rendering //

  if (loaded) {
    return (
    <div
      className='app'
      style={{
        filter: `brightness(${brightness / 100}) contrast(${contrast / 100})`
      }}
    >
      {children}
    </div>
    )
  }

  return (
    <div className='app'>
      {t('LOADING')}
    </div>
  )
}

const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

export default App