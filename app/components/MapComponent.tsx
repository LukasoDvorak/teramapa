'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Therapist, TherapyType } from '../data/therapists'
import 'leaflet/dist/leaflet.css'

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const THERAPY_COLORS: Record<TherapyType, string> = {
  'Psychoterapie': '#7B6FAD',
  'Fyzioterapie': '#5A9E72',
  'Masáže': '#C4845A',
  'Osteopatie': '#4A9E96',
  'Arteterapie': '#C46E97',
  'Výživové poradenství': '#A89040',
}

function createColoredIcon(therapyType: TherapyType) {
  const color = THERAPY_COLORS[therapyType] || '#6366f1'
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 28px; height: 28px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      cursor: pointer;
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })
}

const CZECH_BOUNDS: L.LatLngBoundsExpression = [
  [48.5, 12.0],
  [51.1, 18.9],
]

function MapResizer({ trigger }: { trigger: boolean }) {
  const map = useMap()
  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize()
    }, 400) // počkáme na dokončení CSS animace (350ms + buffer)
    return () => clearTimeout(timeout)
  }, [trigger, map])
  return null
}

function MapController({ search }: { search: string }) {
  const map = useMap()

  useEffect(() => {
    const trimmed = search.trim()
    if (trimmed.length < 2) {
      // Při smazání vyhledávání se vrátit na celou ČR
      if (trimmed.length === 0) {
        map.flyTo([49.8, 15.5], 8, { duration: 1 })
      }
      return
    }

    const timeout = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(trimmed)}&format=json&limit=1&countrycodes=cz`
      )
        .then((r) => r.json())
        .then((data) => {
          if (data && data[0]) {
            map.flyTo([parseFloat(data[0].lat), parseFloat(data[0].lon)], 12, { duration: 1 })
          }
        })
        .catch(() => {})
    }, 600)

    return () => clearTimeout(timeout)
  }, [search, map])

  return null
}

interface Props {
  therapists: Therapist[]
  onSelect: (therapist: Therapist) => void
  search: string
  sidebarOpen: boolean
}

export default function MapComponent({ therapists, onSelect, search, sidebarOpen }: Props) {

  return (
    <MapContainer
      center={[49.8, 15.5]}
      zoom={8}
      minZoom={8}
      maxZoom={16}
      zoomSnap={0.5}
      maxBounds={CZECH_BOUNDS}
      maxBoundsViscosity={1.0}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <MapResizer trigger={sidebarOpen} />
      <MapController search={search} />

      {therapists.map((t) => (
        <Marker
          key={t.id}
          position={[t.lat, t.lng]}
          icon={createColoredIcon(t.therapy_types[0])}
          eventHandlers={{ click: () => onSelect(t) }}
        >
          <Tooltip direction="top" offset={[0, -18]} opacity={1} className="teramapa-tooltip">
            <div style={{ fontFamily: 'system-ui, sans-serif', minWidth: '180px', maxWidth: '220px' }}>
              {/* Foto + jméno */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                {t.profile_photo_url ? (
                  <img
                    src={t.profile_photo_url}
                    alt=""
                    style={{ width: '42px', height: '42px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                  />
                ) : (
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #2A5248, #3D7068)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0,
                  }}>
                    🌿
                  </div>
                )}
                <div>
                  <p style={{ fontWeight: 600, fontSize: '13px', margin: 0, lineHeight: 1.3, color: '#1C3D34' }}>{t.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#9A9088' }}>{t.city}</p>
                </div>
              </div>
              {/* Tagy */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {t.therapy_types.map((type) => (
                  <span
                    key={type}
                    style={{
                      background: THERAPY_COLORS[type] + '20',
                      color: THERAPY_COLORS[type],
                      border: `1px solid ${THERAPY_COLORS[type]}44`,
                      borderRadius: '8px',
                      padding: '2px 8px',
                      fontSize: '11px',
                      fontWeight: 500,
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
