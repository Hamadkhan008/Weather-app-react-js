export default function WeatherSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading weather" className="stack">
      <div className="card sk" style={{ height: 300 }} />
      <div className="metrics">{Array.from({ length: 8 }, (_, i) => <div key={i} className="card sk" style={{ height: 96 }} />)}</div>
      <div className="card sk" style={{ height: 160 }} />
      <div className="card sk" style={{ height: 380 }} />
    </div>
  )
}
