import { useEffect, useState } from 'react'
import { searchCities } from '../services/weatherApi'

export function useCitySearch(query) {
  const [state, setState] = useState({ results: [], loading: false, error: null, searched: false })
  useEffect(() => {
    if (query.trim().length < 2) { setState({ results: [], loading: false, error: null, searched: false }); return }
    const c = new AbortController()
    setState(s => ({ ...s, loading: true, error: null }))
    const t = setTimeout(() => {
      searchCities(query, c.signal)
        .then(results => setState({ results, loading: false, error: null, searched: true }))
        .catch(e => e.name !== 'AbortError' && setState({ results: [], loading: false, error: e.message, searched: true }))
    }, 300)
    return () => { clearTimeout(t); c.abort() }
  }, [query])
  return state
}
