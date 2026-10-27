export const toUnit = (c, unit) => (c == null ? null : unit === 'F' ? c * 9 / 5 + 32 : c)
export const temp = (c, unit) => (c == null ? '–' : `${Math.round(toUnit(c, unit))}°`)
export const num = (v, d = 0) => (v == null ? '–' : Number(v).toFixed(d))
export const windDir = (deg) => deg == null ? '' : ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'][Math.round(deg / 22.5) % 16]
export function clock(iso) {
  if (!iso) return '–'
  const [h, m] = iso.slice(11, 16).split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}
export const hourLabel = (iso) => { const h = Number(iso.slice(11, 13)); return `${h % 12 || 12} ${h < 12 ? 'AM' : 'PM'}` }
export const dayLabel = (iso, i) => i === 0 ? 'Today' : new Date(iso + 'T12:00:00').toLocaleDateString('en', { weekday: 'long' })
export const shortDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' })
export function isDayAt(time, daily) {
  const d = daily.find(x => x.time === time.slice(0, 10))
  return d?.sunrise && d?.sunset ? time >= d.sunrise && time < d.sunset : true
}
export const uvLabel = (v) => v == null ? '' : v < 3 ? 'Low' : v < 6 ? 'Moderate' : v < 8 ? 'High' : v < 11 ? 'Very high' : 'Extreme'
