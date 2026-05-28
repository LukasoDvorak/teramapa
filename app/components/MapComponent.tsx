'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Therapist, TherapyType } from '../data/therapists'
import 'leaflet/dist/leaflet.css'

// Fix pro výchozí ikony markerů v Next.js
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
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  })
}

interface Props {
  therapists: Therapist[]
}

export default function MapComponent({ therapists }: Props) {
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
        >
          <Popup minWidth={220}>
            <div style={{ fontFamily: 'system-ui, sans-serif' }}>
              <p style={{ fontWeight: 700, fontSize: '15px', margin: '0 0 6px' }}>{t.name}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                {t.therapy_types.map((type) => (
                  <span
                    key={type}
                    style={{
                      background: THERAPY_COLORS[type],
                      color: 'white',
                      borderRadius: '12px',
                      padding: '2px 8px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#555' }}>{t.address}</p>
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#555' }}>{t.description}</p>
              {t.phone && (
                <p style={{ margin: '4px 0 0', fontSize: '12px' }}>
                  <a href={`tel:${t.phone}`} style={{ color: '#6366f1' }}>{t.phone}</a>
                </p>
              )}
              {t.website && (
                <p style={{ margin: '4px 0 0', fontSize: '12px' }}>
                  <a href={t.website} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1' }}>
                    Navštívit web →
                  </a>
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
