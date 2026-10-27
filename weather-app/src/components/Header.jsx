import { CloudSun, LocateFixed, Moon, Sun } from 'lucide-react'
import CitySearch from './CitySearch'

export default function Header({ unit, setUnit, theme, setTheme, onSelect, onLocate, locating }) {
  return (
    <header className="header">
      <a className="logo" href="/" aria-label="Weather App home"><span className="logo-mark"><CloudSun size={20} /></span>Weather App</a>
      <CitySearch onSelect={onSelect} />
      <div className="tools">
        <button className="icon-btn" onClick={onLocate} disabled={locating} aria-label="Use my current location" title="Use my current location"><LocateFixed size={18} className={locating ? 'spin' : ''} /></button>
        <div className="seg" role="group" aria-label="Temperature unit">
          {['C', 'F'].map(u => <button key={u} aria-pressed={unit === u} onClick={() => setUnit(u)}>°{u}</button>)}
        </div>
        <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
