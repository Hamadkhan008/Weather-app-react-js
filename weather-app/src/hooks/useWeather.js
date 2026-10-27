import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchWeather } from '../services/weatherApi'

export function useWeather(loc) {
  const [state, setState] = useState({ data: null, status: 'loading', error: null })
  const ctrl = useRef(null)
  const load = useCallback((force = false) => {
    ctrl.current?.abort() // cancel outdated request: prevents race conditions
    const c = new AbortController(); ctrl.current = c
    setState(s => ({ ...s, status: s.data && force ? 'refreshing' : 'loading', error: null }))
    fetchWeather(loc, c.signal, force)
      .then(data => !c.signal.aborted && setState({ data, status: 'ready', error: null }))
      .catch(e => e.name !== 'AbortError' && setState({ data: null, status: 'error', error: e.message }))
  }, [loc.latitude, loc.longitude])
  useEffect(() => { load(); return () => ctrl.current?.abort() }, [load])
  return { ...state, refresh: () => load(true), retry: () => load(true) }
}
