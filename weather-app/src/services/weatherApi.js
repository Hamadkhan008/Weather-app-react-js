const GEO = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST = 'https://api.open-meteo.com/v1/forecast'
const cache = new Map()
const TTL = 10 * 60 * 1000

async function getJson(url, signal) {
  let res
  try { res = await fetch(url, { signal }) }
  catch (e) { if (e.name === 'AbortError') throw e; throw new Error('Network error. Check your connection and try again.') }
  if (!res.ok) throw new Error(`Weather service returned an error (${res.status}). Try again shortly.`)
  return res.json()
}

export async function searchCities(query, signal) {
  const q = query.trim()
  if (q.length < 2) return []
  const data = await getJson(`${GEO}?name=${encodeURIComponent(q)}&count=7&language=en&format=json`, signal)
  return (data.results ?? []).map(r => ({
    id: String(r.id), name: r.name, admin1: r.admin1 ?? '', country: r.country ?? '',
    latitude: r.latitude, longitude: r.longitude, timezone: r.timezone,
  }))
}

export async function fetchWeather({ latitude, longitude }, signal, force = false) {
  const key = `${latitude.toFixed(2)},${longitude.toFixed(2)}`
  const hit = cache.get(key)
  if (!force && hit && Date.now() - hit.at < TTL) return hit.data
  const p = new URLSearchParams({
    latitude, longitude, timezone: 'auto', forecast_days: 7,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,weather_code,precipitation_probability,visibility,dew_point_2m,uv_index',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max',
  })
  const raw = await getJson(`${FORECAST}?${p}`, signal)
  if (!raw?.current || !raw?.hourly?.time || !raw?.daily?.time) throw new Error('The weather service returned incomplete data.')
  const data = normalize(raw)
  cache.set(key, { at: Date.now(), data })
  return data
}

// Column arrays -> row objects. Missing values stay null (never invented).
function normalize(raw) {
  const rows = (obj) => obj.time.map((t, i) => Object.fromEntries(Object.keys(obj).map(k => [k, obj[k]?.[i] ?? null])))
  const hourly = rows(raw.hourly), daily = rows(raw.daily)
  const nowHour = raw.current.time.slice(0, 13)
  const idx = Math.max(0, hourly.findIndex(h => h.time.slice(0, 13) === nowHour))
  return { timezone: raw.timezone, current: raw.current, hourly, daily, nowHourly: hourly[idx], hourlyIndex: idx }
}
