import { useCallback, useEffect, useState } from 'react'
import { CloudOff, RefreshCw } from 'lucide-react'
import Header from './components/Header'
import CurrentWeather from './components/CurrentWeather'
import WeatherMetrics from './components/WeatherMetrics'
import HourlyForecast from './components/HourlyForecast'
import WeeklyForecast from './components/WeeklyForecast'
import FavoriteCities from './components/FavoriteCities'
import WeatherSkeleton from './components/WeatherSkeleton'
import { useWeather } from './hooks/useWeather'
import { describe } from './utils/weatherCodes'

function usePersisted(key, init) {
  const [v, setV] = useState(() => { try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init } catch { return init } })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage unavailable */ } }, [key, v])
  return [v, setV]
}
const DEFAULT = { id: '1174872', name: 'Karachi', admin1: 'Sindh', country: 'Pakistan', latitude: 24.8608, longitude: 67.0104 }
const prefersDark = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches

export default function App() {
  const [loc, setLoc] = usePersisted('weather-app:loc', DEFAULT)
  const [unit, setUnit] = usePersisted('weather-app:unit', 'C')
  const [theme, setTheme] = usePersisted('weather-app:theme', prefersDark() ? 'dark' : 'light')
  const [favorites, setFavorites] = usePersisted('weather-app:favs', [])
  const [recents, setRecents] = usePersisted('weather-app:recent', [])
  const [notice, setNotice] = useState(null)
  const [locating, setLocating] = useState(false)
  const { data, status, error, refresh, retry } = useWeather(loc)

  const select = useCallback((c) => {
    setLoc(c); setNotice(null)
    if (c.id !== 'geo') setRecents(r => [c, ...r.filter(x => x.id !== c.id)].slice(0, 5))
  }, [setLoc, setRecents])

  const locate = () => {
    if (!navigator.geolocation) return setNotice('Your browser does not support location. Search for a city instead.')
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      p => { setLocating(false); select({ id: 'geo', name: 'Current location', admin1: '', country: '', latitude: p.coords.latitude, longitude: p.coords.longitude }) },
      e => { setLocating(false); setNotice(e.code === 1 ? 'Location access is blocked. Allow it in your browser settings, or search for a city above.' : 'We couldn’t find your location. Search for a city instead.') },
      { timeout: 10000, maximumAge: 300000 })
  }

  const isFav = favorites.some(f => f.id === loc.id)
  const toggleFav = () => loc.id !== 'geo' && setFavorites(f => isFav ? f.filter(x => x.id !== loc.id) : [...f, loc])
  const wx = data ? describe(data.current.weather_code, !!data.current.is_day).theme : 'cloudy'

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  return (
    <div className="app" data-weather={wx}>
      <Header unit={unit} setUnit={setUnit} theme={theme} setTheme={setTheme} onSelect={select} onLocate={locate} locating={locating} />
      <main className="main">
        {notice && <p className="banner" role="status">{notice}</p>}
        <FavoriteCities favorites={favorites} recents={recents} activeId={loc.id} onSelect={select} onRemoveFav={c => setFavorites(f => f.filter(x => x.id !== c.id))} />
        {status === 'error' && (
          <div className="card empty" role="alert"><CloudOff size={40} /><h2>Couldn’t load the forecast</h2><p className="muted">{error}</p>
            <button className="btn" onClick={retry}><RefreshCw size={16} /> Try again</button></div>
        )}
        {status === 'loading' && !data && <WeatherSkeleton />}
        {data && (
          <div className="stack" style={{ opacity: status === 'loading' ? 0.6 : 1 }}>
            <CurrentWeather data={data} loc={loc} unit={unit} isFav={isFav} onToggleFav={toggleFav} onRefresh={refresh} refreshing={status === 'refreshing' || status === 'loading'} />
            <WeatherMetrics data={data} unit={unit} />
            <HourlyForecast data={data} unit={unit} />
            <WeeklyForecast data={data} unit={unit} />
          </div>
        )}
      </main>
      <footer className="foot muted">Weather data by <a href="https://open-meteo.com/">Open-Meteo</a></footer>
    </div>
  )
}
