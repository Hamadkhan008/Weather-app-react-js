# Weather App

A premium weather dashboard built with React, Vite, and the free [Open-Meteo](https://open-meteo.com/en/docs) APIs. No API key required, and no mock data anywhere.

## Features
- Global city search (Open-Meteo Geocoding): debounced, cancels stale requests, keyboard navigation, city/region/country labels
- Current conditions, feels-like, daily high/low, sunrise/sunset, local date/time and timezone
- Metric cards: humidity, wind, pressure, visibility, UV, cloud cover, dew point, rain chance (a card is hidden if the API returns no value)
- 24-hour scrollable forecast with the current hour highlighted, and a 7-day forecast with range bars
- Geolocation with permission handling and a search fallback
- Favorites, recent cities, theme, and unit stored in localStorage
- °C/°F conversion (client-side, no refetch), light/dark themes, weather-aware backgrounds
- Skeleton loaders, error and empty states with retry, refresh button, 10-minute request cache
- Reduced-motion support, visible focus states, accessible tooltips and ARIA combobox

## Run locally
```bash
npm install
npm run dev
```

## Structure
`services/weatherApi.js` (all fetching and normalization), `hooks/` (state logic), `components/` (presentation), `utils/` (weather codes, formatters).

## API notes
- Geocoding: `geocoding-api.open-meteo.com/v1/search`
- Forecast: `api.open-meteo.com/v1/forecast` with `timezone=auto`
- Open-Meteo is free for non-commercial use without a key. Geolocation lookups show as “Current location” because Open-Meteo has no reverse geocoding.

## Deploy
**Vercel:** import the repo, framework preset *Vite*, deploy (build `npm run build`, output `dist`).
**Netlify:** build command `npm run build`, publish directory `dist`.

## Screenshots
Capture 1440px desktop, 820px tablet, and 390px mobile in both themes, once on a clear and once on a rainy city, for the portfolio.
