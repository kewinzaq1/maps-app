import {createContext, useContext, useState} from 'react'
import {useJsApiLoader} from '@react-google-maps/api'
import {libraries, useSessionStorageState} from '../Utils'
import {ChildrenModel, MapModel} from '../Utils/Models'
import {Alert} from '@mui/material'
import {Progress} from './Shared'

const MapContext = createContext<MapModel | null>(null)

export const MapProvider = ({children}: ChildrenModel) => {
  const [status, setStatus] = useState('idle')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [distance, setDistance] = useState(0)
  const [error, setError] = useState<Error>()
  const [history, setHistory] = useSessionStorageState({
    name: 'history',
    initialValue: [],
    removeAfterRefresh: true,
  })

  const isSuccess = status === 'success'
  const isError = status === 'error'
  const isIdle = status === 'idle'
  const isPending = status === 'pending'

  const {isLoaded, loadError} = useJsApiLoader({
    id: 'maps',
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
    libraries,
    language: 'en',
    region: 'Europe',
  })

  const props = {
    status,
    isSuccess,
    isError,
    isIdle,
    isPending,
    isLoaded,
    loadError,
    error,
    setError,
    setStatus,
    origin,
    setOrigin,
    destination,
    setDestination,
    distance,
    setDistance,
    history,
    setHistory,
  }

  if (loadError || isError) {
    return <Alert color={'error'}>{error?.message}</Alert>
  }

  if (!isLoaded) {
    return <Progress />
  }

  return <MapContext.Provider value={props}>{children}</MapContext.Provider>
}

export const useMap = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMap() used only within MapProvider')
  }
  return context
}
export {Progress} from './Shared'
