import { Sun, Moon, CloudSun, CloudMoon, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, Snowflake } from 'lucide-react'
const MAP = { Sun, Moon, CloudSun, CloudMoon, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, Snowflake }
export default function WeatherIcon({ name, size = 24, ...p }) {
  const I = MAP[name] ?? Cloud
  return <I size={size} strokeWidth={1.75} aria-hidden {...p} />
}
