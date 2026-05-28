'use client'

import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import TherapistPanel from '../components/TherapistPanel'
import { Therapist, TherapyType, ALL_THERAPY_TYPES } from '../data/therapists'
import { supabase } from '../lib/supabase'

const THERAPY_COLORS: Record<TherapyType, string> = {
  'Psychoterapie': '#9B8FC8',
  'Fyzioterapie': '#6AAF82',
  'Masáže': '#D4956A',
  'Osteopatie': '#5AAEA6',
  'Arteterapie': '#D47EA7',
  'Výživové poradenství': '#B8A050',
}

export default function Terapeuti() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<TherapyType[]>([])
  const [search, setSearch] = useState('')
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)

  useEffect(() => {
    supabase.from('therapists').select('*').eq('approved', true).then(({ data, error }) => {
      if (!error && data) setTherapists(data as Therapist[])
      setLoading(false)
    })
  }, [])

  const toggleFilter = (type: TherapyType) => {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const filtered = therapists
    .filter((t) => activeFilters.length === 0 || t.therapy_types.some((type) => activeFilters.includes(type)))
    .filter((t) => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return t.city.toLowerCase().includes(q) || t.name.toLowerCase().includes(q)
    })

  return (
    <div style={{ background: '#FDFAF6', minHeight: '100vh' }}>
      <Navigation variant="light" />

      {/* Header */}
      <section style={{
        background: 'linear-gradient(160deg, #1C3D34 0%, #264D42 55%, #2E5E52 100%)',
        paddingTop: '110px',
        paddingBottom: '60px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <h1 className="font-playfair" style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 600,
            color: 'white',
            lineHeight: 1.1,
            letterSpacing: '-0.8px',
            marginBottom: '14px',
          }}>
            Terapeuti
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>
            Odborníci, kteří vnímají člověka jako celek
          </p>
        </div>
      </section>

      {/* Filtry + search — sticky lišta */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 800,
        background: 'rgba(253,250,246,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #EDE8E0',
        padding: '14px 32px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'white',
            border: '1.5px solid #EDE8E0',
            borderRadius: '10px',
            padding: '9px 14px',
            flex: '1',
            minWidth: '200px',
            maxWidth: '280px',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9A9088" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Hledat jméno nebo město…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', color: '#2A2A2A' }}
            />
          </div>

          {/* Filtry */}
          <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', flex: 1 }}>
            {ALL_THERAPY_TYPES.map((type) => {
              const isActive = activeFilters.includes(type)
              const color = THERAPY_COLORS[type]
              return (
                <button key={type} onClick={() => toggleFilter(type)} style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 500,
                  border: `1.5px solid ${isActive ? color : '#D8D0C8'}`,
                  background: isActive ? color : 'transparent',
                  color: isActive ? 'white' : '#7A8C85',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}>
                  {type}
                </button>
              )
            })}
            {activeFilters.length > 0 && (
              <button onClick={() => setActiveFilters([])} style={{
                padding: '6px 14px', borderRadius: '20px', fontSize: '12px',
                border: '1.5px solid #D8D0C8', background: 'transparent',
                color: '#9A9088', cursor: 'pointer',
              }}>
                Zrušit ×
              </button>
            )}
          </div>

          {/* Počet */}
          <p style={{ fontSize: '13px', color: '#9A9088', whiteSpace: 'nowrap', margin: 0 }}>
            {loading ? '…' : `${filtered.length} ${filtered.length === 1 ? 'terapeut' : filtered.length < 5 ? 'terapeuti' : 'terapeutů'}`}
          </p>
        </div>
      </div>

      {/* Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px 80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9A9088', fontSize: '15px' }}>
            Načítám terapeuty…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: '32px', marginBottom: '16px' }}>🌿</p>
            <p style={{ fontSize: '16px', color: '#9A9088' }}>Žádný terapeut neodpovídá hledání</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filtered.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTherapist(t)}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #EDE8E0',
                  boxShadow: '0 2px 16px rgba(20,40,35,0.05)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(20,40,35,0.12)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(20,40,35,0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Foto */}
                {t.profile_photo_url ? (
                  <img
                    src={t.profile_photo_url}
                    alt={t.name}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '180px',
                    background: 'linear-gradient(135deg, #2A5248, #3D7068)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '40px', opacity: 0.25 }}>🌿</span>
                  </div>
                )}

                {/* Info */}
                <div style={{ padding: '18px 20px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <h3 className="font-playfair" style={{ fontSize: '17px', fontWeight: 600, color: '#1C3D34', margin: '0 0 3px' }}>
                        {t.name}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#9A9088', margin: 0 }}>📍 {t.city}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                    {t.therapy_types.map((type) => (
                      <span key={type} style={{
                        background: THERAPY_COLORS[type] + '18',
                        color: THERAPY_COLORS[type],
                        border: `1px solid ${THERAPY_COLORS[type]}33`,
                        borderRadius: '20px',
                        padding: '2px 10px',
                        fontSize: '11px',
                        fontWeight: 500,
                      }}>
                        {type}
                      </span>
                    ))}
                  </div>

                  <p style={{
                    fontSize: '13px',
                    color: '#7A8C85',
                    lineHeight: 1.6,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  } as React.CSSProperties}>
                    {t.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <TherapistPanel
        therapist={selectedTherapist}
        onClose={() => setSelectedTherapist(null)}
      />
    </div>
  )
}
