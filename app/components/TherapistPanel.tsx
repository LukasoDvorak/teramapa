'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Therapist, TherapyType } from '../data/therapists'
import { supabase } from '../lib/supabase'

const THERAPY_COLORS: Record<TherapyType, string> = {
  'Psychoterapie': '#9B8FC8',
  'Fyzioterapie': '#6AAF82',
  'Masáže': '#D4956A',
  'Osteopatie': '#5AAEA6',
  'Arteterapie': '#D47EA7',
  'Výživové poradenství': '#B8A050',
}

interface Props {
  therapist: Therapist | null
  onClose: () => void
}

export default function TherapistPanel({ therapist, onClose }: Props) {
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    if (!therapist) { setPhotos([]); return }
    supabase
      .from('therapist_photos')
      .select('url')
      .eq('therapist_id', therapist.id)
      .then(({ data }) => {
        if (data) setPhotos(data.map((p: { url: string }) => p.url))
      })
  }, [therapist?.id])

  return (
    <>
      {/* Overlay pro mobil */}
      {therapist && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(20,40,35,0.35)',
            backdropFilter: 'blur(2px)',
            zIndex: 999,
          }}
          className="sm:hidden"
        />
      )}

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          right: therapist ? '16px' : '-440px',
          height: 'calc(100vh - 32px)',
          width: '400px',
          background: '#FDFAF6',
          borderRadius: '20px',
          boxShadow: '0 24px 64px rgba(20,40,35,0.18)',
          transition: 'right 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="w-full sm:w-[400px]"
      >
        {therapist && (
          <>
            {/* Foto hlavička */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {therapist.profile_photo_url ? (
                <img
                  src={therapist.profile_photo_url}
                  alt={therapist.name}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '20px 20px 0 0', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '220px',
                  background: 'linear-gradient(135deg, #2A5248 0%, #3D7068 100%)',
                  borderRadius: '20px 20px 0 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '64px', opacity: 0.25 }}>🌿</span>
                </div>
              )}

              {/* Zavírací tlačítko */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute', top: '12px', right: '12px',
                  width: '32px', height: '32px',
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: '50%',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  fontSize: '14px', color: '#555',
                  backdropFilter: 'blur(4px)',
                }}
              >
                ✕
              </button>
            </div>

            {/* Obsah */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* Jméno + typy */}
              <div>
                <h2 className="font-playfair" style={{ fontSize: '22px', fontWeight: 600, color: '#1C3D34', marginBottom: '10px', lineHeight: 1.2 }}>
                  {therapist.name}
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {therapist.therapy_types.map((type) => (
                    <span
                      key={type}
                      style={{
                        background: THERAPY_COLORS[type] + '22',
                        color: THERAPY_COLORS[type],
                        border: `1px solid ${THERAPY_COLORS[type]}44`,
                        borderRadius: '20px',
                        padding: '3px 12px',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Místo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: '#EDE8E0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', flexShrink: 0,
                }}>
                  📍
                </div>
                <span style={{ fontSize: '13px', color: '#7A8C85' }}>
                  {therapist.address}, {therapist.city}
                </span>
              </div>

              {/* Oddělovač */}
              <div style={{ height: '1px', background: '#EDE8E0' }} />

              {/* Popis */}
              <p style={{ fontSize: '13px', color: '#5A6A64', lineHeight: 1.7, margin: 0 }}>
                {therapist.description}
              </p>

              {/* Galerie */}
              {photos.length > 0 && (
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 600, color: '#AAA099', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Fotografie
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                    {photos.map((url, i) => (
                      <img
                        key={i} src={url} alt=""
                        style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '10px' }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Kontakt */}
              {(therapist.phone || therapist.website) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {therapist.phone && (
                    <a
                      href={`tel:${therapist.phone}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 14px', borderRadius: '10px',
                        background: '#F5F0E8', textDecoration: 'none',
                        fontSize: '13px', color: '#2E5E52', fontWeight: 500,
                      }}
                    >
                      <span>📞</span> {therapist.phone}
                    </a>
                  )}
                  {therapist.website && (
                    <a
                      href={therapist.website} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 14px', borderRadius: '10px',
                        background: '#F5F0E8', textDecoration: 'none',
                        fontSize: '13px', color: '#2E5E52', fontWeight: 500,
                      }}
                    >
                      <span>🌐</span> Navštívit web
                    </a>
                  )}
                </div>
              )}

              {/* CTA tlačítko */}
              <Link
                href={`/terapeut?id=${therapist.id}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #1C3D34 0%, #2E5E52 100%)',
                  color: 'white',
                  borderRadius: '14px',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  letterSpacing: '0.2px',
                }}
              >
                Zobrazit celý profil →
              </Link>

            </div>
          </>
        )}
      </div>
    </>
  )
}
