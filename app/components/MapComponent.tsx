'use client'

import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
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
  'Psychoterapie': '#6366f1',
  'Fyzioterapie': '#22c55e',
  'Masáže': '#f97316',
  'Osteopatie': '#14b8a6',
  'Arteterapie': '#ec4899',
  'Výživové poradenství': '#eab308',
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

interface Props {
  therapists: Therapist[]
  onSelect: (therapist: Therapist) => void
}

export default function MapComponent({ therapists, onSelect }: Props) {
  return (
    <MapContainer
      center={[49.8, 15.5]}
      zoom={7}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {therapists.map((t) => (
        <Marker
          key={t.id}
          position={[t.lat, t.lng]}
          icon={createColoredIcon(t.therapy_types[0])}
          eventHandlers={{ click: () => onSelect(t) }}
        >
          <Tooltip direction="top" offset={[0, -16]} opacity={1}>
            <div style={{ fontFamily: 'system-ui, sans-serif', minWidth: '160px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                {t.profile_photo_url ? (
                  <img
                    src={t.profile_photo_url}
                    alt=""
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                  />
                ) : (
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: THERAPY_COLORS[t.therapy_types[0]] + '33',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', flexShrink: 0,
                  }}>
                    👤
                  </div>
                )}
                <p style={{ fontWeight: 700, fontSize: '13px', margin: 0, lineHeight: 1.3 }}>{t.name}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '4px' }}>
                {t.therapy_types.map((type) => (
                  <span
                    key={type}
                    style={{
                      background: THERAPY_COLORS[type],
                      color: 'white',
                      borderRadius: '10px',
                      padding: '1px 7px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>📍 {t.city}</p>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
