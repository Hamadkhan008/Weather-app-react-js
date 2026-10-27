import { Clock, Heart, X } from 'lucide-react'

export default function FavoriteCities({ favorites, recents, activeId, onSelect, onRemoveFav }) {
  const recentOnly = recents.filter(r => !favorites.some(f => f.id === r.id))
  if (!favorites.length && !recentOnly.length) return <p className="muted hint">Search for a city, then tap the heart to save it here.</p>
  return (
    <nav className="saved" aria-label="Saved and recent cities">
      {favorites.map(c => (
        <span key={c.id} className={`chip ${c.id === activeId ? 'on' : ''}`}>
          <button onClick={() => onSelect(c)} aria-current={c.id === activeId}><Heart size={13} fill="currentColor" aria-hidden />{c.name}</button>
          <button className="x" onClick={() => onRemoveFav(c)} aria-label={`Remove ${c.name} from favorites`}><X size={13} /></button>
        </span>
      ))}
      {recentOnly.map(c => (
        <span key={c.id} className="chip recent"><button onClick={() => onSelect(c)}><Clock size={13} aria-hidden />{c.name}</button></span>
      ))}
    </nav>
  )
}
