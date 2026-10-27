import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp, Heart, RefreshCw, Sunrise, Sunset, Globe } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { describe } from '../utils/weatherCodes'
import { clock, temp } from '../utils/formatters'

export default function CurrentWeather({ data, loc, unit, isFav, onToggleFav, onRefresh, refreshing }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t) }, [])
  const c = data.current, today = data.daily[0], w = describe(c.weather_code, !!c.is_day)
  const tz = data.timezone
  const date = now.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', timeZone: tz })
  const time = now.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit', timeZone: tz })
  return (
    <section className="card hero" aria-labelledby="place">
      <div className="hero-top">
        <div>
          <h1 id="place">{loc.name}{loc.country && <span>, {loc.country}</span>}</h1>
          <p className="muted">{date} · {time}</p>
          <p className="muted tz"><Globe size={14} aria-hidden /> {tz.replace('_', ' ')}</p>
        </div>
        <div className="hero-actions">
          <button className="icon-btn" onClick={onRefresh} aria-label="Refresh weather" title="Refresh weather"><RefreshCw size={17} className={refreshing ? 'spin' : ''} /></button>
          <button className={`icon-btn ${isFav ? 'fav' : ''}`} onClick={onToggleFav} aria-pressed={isFav} aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'} title="Favorite"><Heart size={17} fill={isFav ? 'currentColor' : 'none'} /></button>
        </div>
      </div>
      <div className="hero-main">
        <div className="big" aria-label={`Temperature ${temp(c.temperature_2m, unit)}`}>{temp(c.temperature_2m, unit)}<small>{unit}</small></div>
        <div className="cond"><WeatherIcon name={w.icon} size={64} /><strong>{w.label}</strong><span className="muted">Feels like {temp(c.apparent_temperature, unit)}</span></div>
      </div>
      <dl className="facts">
        <div><dt><ArrowUp size={15} /> High</dt><dd>{temp(today.temperature_2m_max, unit)}</dd></div>
        <div><dt><ArrowDown size={15} /> Low</dt><dd>{temp(today.temperature_2m_min, unit)}</dd></div>
        <div><dt><Sunrise size={15} /> Sunrise</dt><dd>{clock(today.sunrise)}</dd></div>
        <div><dt><Sunset size={15} /> Sunset</dt><dd>{clock(today.sunset)}</dd></div>
      </dl>
    </section>
  )
}
