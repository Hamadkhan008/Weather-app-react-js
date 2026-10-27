import { Droplets, Wind, Gauge, Eye, Sun, Cloud, Thermometer, Umbrella } from 'lucide-react'
import { windDir, num, uvLabel, temp } from '../utils/formatters'

export default function WeatherMetrics({ data, unit }) {
  const c = data.current, h = data.nowHourly
  const items = [
    { k: 'Humidity', I: Droplets, v: c.relative_humidity_2m, text: `${num(c.relative_humidity_2m)}%`, bar: c.relative_humidity_2m, tip: 'Share of moisture the air holds relative to its maximum.' },
    { k: 'Wind', I: Wind, v: c.wind_speed_10m, text: `${num(c.wind_speed_10m)} km/h`, sub: windDir(c.wind_direction_10m), tip: 'Wind speed at 10 m and the direction it blows from.' },
    { k: 'Pressure', I: Gauge, v: c.pressure_msl, text: `${num(c.pressure_msl)} hPa`, tip: 'Atmospheric pressure at mean sea level.' },
    { k: 'Visibility', I: Eye, v: h?.visibility, text: h?.visibility == null ? '–' : `${num(h.visibility / 1000, 1)} km`, tip: 'How far you can see clearly.' },
    { k: 'UV index', I: Sun, v: h?.uv_index, text: num(h?.uv_index, 1), sub: uvLabel(h?.uv_index), bar: h?.uv_index == null ? null : Math.min(h.uv_index / 11 * 100, 100), tip: 'Strength of ultraviolet radiation. 3+ needs sun protection.' },
    { k: 'Cloud cover', I: Cloud, v: c.cloud_cover, text: `${num(c.cloud_cover)}%`, bar: c.cloud_cover, tip: 'Portion of the sky covered by clouds.' },
    { k: 'Dew point', I: Thermometer, v: h?.dew_point_2m, text: `${temp(h?.dew_point_2m, unit)}${unit}`, tip: 'Temperature at which air becomes saturated. Higher feels muggier.' },
    { k: 'Rain chance', I: Umbrella, v: h?.precipitation_probability, text: `${num(h?.precipitation_probability)}%`, bar: h?.precipitation_probability, tip: 'Probability of precipitation this hour.' },
  ].filter(i => i.v != null)
  return (
    <section aria-label="Weather details" className="metrics">
      {items.map(({ k, I, text, sub, bar, tip }) => (
        <div className="card metric" key={k} tabIndex={0} data-tip={tip}>
          <div className="mh"><I size={17} aria-hidden />{k}</div>
          <div className="mv">{text}{sub && <small>{sub}</small>}</div>
          {bar != null && <div className="bar" role="presentation"><i style={{ width: `${bar}%` }} /></div>}
        </div>
      ))}
    </section>
  )
}
