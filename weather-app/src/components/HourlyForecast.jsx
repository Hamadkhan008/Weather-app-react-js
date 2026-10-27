import { Droplet } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { describe } from '../utils/weatherCodes'
import { hourLabel, isDayAt, num, temp } from '../utils/formatters'

export default function HourlyForecast({ data, unit }) {
  const hours = data.hourly.slice(data.hourlyIndex, data.hourlyIndex + 24)
  return (
    <section className="card" aria-labelledby="hourly">
      <h2 id="hourly">Next 24 hours</h2>
      <ol className="hours" tabIndex={0} aria-label="Hourly forecast, scrollable">
        {hours.map((h, i) => {
          const w = describe(h.weather_code, isDayAt(h.time, data.daily))
          return (
            <li key={h.time} className={i === 0 ? 'now' : ''} aria-current={i === 0 ? 'time' : undefined}>
              <span className="muted">{i === 0 ? 'Now' : hourLabel(h.time)}</span>
              <WeatherIcon name={w.icon} size={26} />
              <b>{temp(h.temperature_2m, unit)}</b>
              <span className="pop"><Droplet size={11} aria-hidden />{num(h.precipitation_probability)}%</span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
