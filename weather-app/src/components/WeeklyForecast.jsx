import WeatherIcon from './WeatherIcon'
import { describe } from '../utils/weatherCodes'
import { dayLabel, num, shortDate, temp, toUnit } from '../utils/formatters'

export default function WeeklyForecast({ data, unit }) {
  const lo = Math.min(...data.daily.map(d => toUnit(d.temperature_2m_min, unit)))
  const hi = Math.max(...data.daily.map(d => toUnit(d.temperature_2m_max, unit)))
  const pos = (v) => ((toUnit(v, unit) - lo) / (hi - lo || 1)) * 100
  return (
    <section className="card" aria-labelledby="weekly">
      <h2 id="weekly">7-day forecast</h2>
      <ul className="week">
        {data.daily.map((d, i) => {
          const w = describe(d.weather_code, true)
          return (
            <li key={d.time}>
              <div className="day"><b>{dayLabel(d.time, i)}</b><span className="muted">{shortDate(d.time)}</span></div>
              <WeatherIcon name={w.icon} size={24} />
              <span className="wc">{w.label}</span>
              <span className="pop">{d.precipitation_probability_max == null ? '' : `${num(d.precipitation_probability_max)}%`}</span>
              <span className="lo">{temp(d.temperature_2m_min, unit)}</span>
              <span className="range" aria-hidden><i style={{ left: `${pos(d.temperature_2m_min)}%`, right: `${100 - pos(d.temperature_2m_max)}%` }} /></span>
              <span className="hi">{temp(d.temperature_2m_max, unit)}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
