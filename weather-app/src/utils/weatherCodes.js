const M = (label, day, night, theme) => ({ label, day, night, theme })
const table = {
  0: M('Clear sky', 'Sun', 'Moon', 'clear'), 1: M('Mostly clear', 'Sun', 'Moon', 'clear'),
  2: M('Partly cloudy', 'CloudSun', 'CloudMoon', 'cloudy'), 3: M('Overcast', 'Cloud', 'Cloud', 'cloudy'),
  45: M('Fog', 'CloudFog', 'CloudFog', 'cloudy'), 48: M('Rime fog', 'CloudFog', 'CloudFog', 'cloudy'),
  51: M('Light drizzle', 'CloudDrizzle', 'CloudDrizzle', 'rain'), 53: M('Drizzle', 'CloudDrizzle', 'CloudDrizzle', 'rain'),
  55: M('Heavy drizzle', 'CloudDrizzle', 'CloudDrizzle', 'rain'), 56: M('Freezing drizzle', 'CloudDrizzle', 'CloudDrizzle', 'rain'),
  57: M('Freezing drizzle', 'CloudDrizzle', 'CloudDrizzle', 'rain'),
  61: M('Light rain', 'CloudRain', 'CloudRain', 'rain'), 63: M('Rain', 'CloudRain', 'CloudRain', 'rain'),
  65: M('Heavy rain', 'CloudRain', 'CloudRain', 'rain'), 66: M('Freezing rain', 'CloudRain', 'CloudRain', 'rain'),
  67: M('Freezing rain', 'CloudRain', 'CloudRain', 'rain'),
  71: M('Light snow', 'CloudSnow', 'CloudSnow', 'snow'), 73: M('Snow', 'CloudSnow', 'CloudSnow', 'snow'),
  75: M('Heavy snow', 'Snowflake', 'Snowflake', 'snow'), 77: M('Snow grains', 'Snowflake', 'Snowflake', 'snow'),
  80: M('Light showers', 'CloudRain', 'CloudRain', 'rain'), 81: M('Showers', 'CloudRain', 'CloudRain', 'rain'),
  82: M('Violent showers', 'CloudRain', 'CloudRain', 'rain'),
  85: M('Snow showers', 'CloudSnow', 'CloudSnow', 'snow'), 86: M('Heavy snow showers', 'CloudSnow', 'CloudSnow', 'snow'),
  95: M('Thunderstorm', 'CloudLightning', 'CloudLightning', 'storm'),
  96: M('Thunderstorm, hail', 'CloudLightning', 'CloudLightning', 'storm'), 99: M('Severe thunderstorm', 'CloudLightning', 'CloudLightning', 'storm'),
}
export function describe(code, isDay = true) {
  const m = table[code] ?? M('Unknown', 'Cloud', 'Cloud', 'cloudy')
  return { label: m.label, icon: isDay ? m.day : m.night, theme: m.theme }
}
