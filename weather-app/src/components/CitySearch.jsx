import { useEffect, useId, useRef, useState } from 'react'
import { Search, Loader2, MapPin } from 'lucide-react'
import { useCitySearch } from '../hooks/useCitySearch'

export default function CitySearch({ onSelect }) {
  const [q, setQ] = useState(''); const [open, setOpen] = useState(false); const [active, setActive] = useState(-1)
  const { results, loading, error, searched } = useCitySearch(q)
  const id = useId(); const box = useRef(null)
  useEffect(() => { setActive(-1) }, [results])
  useEffect(() => {
    const h = (e) => !box.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', h); return () => document.removeEventListener('pointerdown', h)
  }, [])
  const pick = (c) => { onSelect(c); setQ(''); setOpen(false) }
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive(i => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && results.length) { e.preventDefault(); pick(results[Math.max(active, 0)]) }
    else if (e.key === 'Escape') { setOpen(false); e.target.blur() }
  }
  const show = open && q.trim().length >= 2
  return (
    <div className="search" ref={box}>
      <Search size={18} aria-hidden />
      <input role="combobox" aria-expanded={show} aria-controls={id} aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${id}-${active}` : undefined} aria-label="Search for a city"
        placeholder="Search any city" value={q} onChange={e => { setQ(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)} onKeyDown={onKey} autoComplete="off" />
      {loading && <Loader2 size={16} className="spin" aria-label="Searching" />}
      {show && (
        <ul className="suggest" id={id} role="listbox">
          {error && <li className="note err" role="alert">{error}</li>}
          {!error && !loading && searched && !results.length && <li className="note">No cities match “{q}”. Check the spelling or try a nearby city.</li>}
          {results.map((c, i) => (
            <li key={c.id} id={`${id}-${i}`} role="option" aria-selected={i === active}
              className={i === active ? 'on' : ''} onMouseEnter={() => setActive(i)} onClick={() => pick(c)}>
              <MapPin size={16} aria-hidden /><span><b>{c.name}</b><small>{[c.admin1, c.country].filter(Boolean).join(', ')}</small></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
