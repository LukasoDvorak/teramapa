'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ALL_THERAPY_TYPES, TherapyType, Therapist } from '../data/therapists'
import { supabase } from '../lib/supabase'
import TherapistPanel from '../components/TherapistPanel'
import Navigation from '../components/Navigation'

const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false })

const THERAPY_COLORS: Record<TherapyType, string> = {
  'Psychoterapie': '#9B8FC8',
  'Fyzioterapie': '#6AAF82',
  'Masáže': '#D4956A',
  'Osteopatie': '#5AAEA6',
  'Arteterapie': '#D47EA7',
  'Výživové poradenství': '#B8A050',
}

function BotanicalDecoration() {
  return (
    <svg viewBox="0 0 280 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <path d="M140 420 Q135 360 120 300 Q105 240 90 180 Q75 120 85 60" stroke="white" fill="none" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M140 420 Q148 350 155 290 Q162 230 170 170 Q178 110 165 50" stroke="white" fill="none" strokeWidth="1" strokeLinecap="round"/>
      <path d="M140 420 Q125 380 110 340 Q95 300 80 260" stroke="white" fill="none" strokeWidth="0.8" strokeLinecap="round"/>
      <ellipse cx="78" cy="200" rx="28" ry="10" transform="rotate(-45 78 200)" fill="white" opacity="0.7"/>
      <ellipse cx="68" cy="155" rx="22" ry="8" transform="rotate(-55 68 155)" fill="white" opacity="0.5"/>
      <ellipse cx="82" cy="250" rx="24" ry="9" transform="rotate(-35 82 250)" fill="white" opacity="0.6"/>
      <ellipse cx="72" cy="110" rx="18" ry="7" transform="rotate(-60 72 110)" fill="white" opacity="0.4"/>
      <ellipse cx="88" cy="300" rx="20" ry="8" transform="rotate(-30 88 300)" fill="white" opacity="0.5"/>
      <ellipse cx="168" cy="185" rx="26" ry="9" transform="rotate(40 168 185)" fill="white" opacity="0.65"/>
      <ellipse cx="174" cy="140" rx="20" ry="8" transform="rotate(50 174 140)" fill="white" opacity="0.5"/>
      <ellipse cx="162" cy="235" rx="22" ry="8" transform="rotate(35 162 235)" fill="white" opacity="0.55"/>
      <ellipse cx="170" cy="95" rx="16" ry="6" transform="rotate(55 170 95)" fill="white" opacity="0.4"/>
      <path d="M90 180 Q65 165 50 150" stroke="white" fill="none" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M168 185 Q193 170 208 158" stroke="white" fill="none" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <circle cx="52" cy="148" r="4" fill="white" opacity="0.4"/>
      <circle cx="210" cy="156" r="4" fill="white" opacity="0.4"/>
    </svg>
  )
}

export default function MapPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<TherapyType[]>([])
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    async function fetchTherapists() {
      const { data, error } = await supabase.from('therapists').select('*').eq('approved', true)
      if (!error && data) setTherapists(data as Therapist[])
      setLoading(false)
    }
    fetchTherapists()
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
    <div style={{ background: 'linear-gradient(175deg, #1C3D34 0%, #264D42 50%, #2E5E52 100%)' }}>
      <Navigation variant="dark" />
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', marginTop: '64px', overflow: 'hidden' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarOpen ? '340px' : '0px',
        flexShrink: 0,
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Botanická dekorace */}
        <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '260px', height: '380px', opacity: 0.12, pointerEvents: 'none' }}>
          <BotanicalDecoration />
        </div>

        {/* Obsah — fixní šířka, clipne se při zavírání */}
        <div style={{ width: '340px', flexShrink: 0, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', padding: '28px 32px 32px' }}>

          {/* Logo + zpět */}
          <Link href="/" style={{ textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
            <h1 className="font-playfair" style={{ color: 'white', fontSize: '34px', fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1, margin: 0 }}>
              Teramapa
            </h1>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Místo, kde začíná cesta ke klidu
          </p>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', margin: '24px 0' }} />

          {/* Vyhledávání */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '12px', padding: '11px 16px', marginBottom: '20px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Hledat město nebo jméno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-glass"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', color: 'white' }}
            />
          </div>

          {/* Filtry */}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Typ péče</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {ALL_THERAPY_TYPES.map((type) => {
                const isActive = activeFilters.includes(type)
                const color = THERAPY_COLORS[type]
                return (
                  <button key={type} onClick={() => toggleFilter(type)} style={{ padding: '5px 13px', borderRadius: '20px', fontSize: '12px', fontWeight: 500, border: `1.5px solid ${isActive ? color : 'rgba(255,255,255,0.2)'}`, background: isActive ? color : 'transparent', color: isActive ? 'white' : 'rgba(255,255,255,0.65)', cursor: 'pointer', transition: 'all 0.15s' }}>
                    {type}
                  </button>
                )
              })}
              {activeFilters.length > 0 && (
                <button onClick={() => setActiveFilters([])} style={{ padding: '5px 13px', borderRadius: '20px', fontSize: '12px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                  Zrušit ×
                </button>
              )}
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Počet + přihlášení */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginBottom: '12px' }}>
              {loading ? 'Načítám…' : `${filtered.length} ${filtered.length === 1 ? 'terapeut' : filtered.length < 5 ? 'terapeuti' : 'terapeutů'} ve výsledcích`}
            </p>
            <Link href="/prihlaseni" style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: 500, background: 'rgba(255,255,255,0.07)', textDecoration: 'none' }}>
              Přihlásit se
            </Link>
          </div>
        </div>
      </aside>

      {/* ── Mapa (+ toggle tab jako flex item) ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        background: 'transparent',
        position: 'relative',
      }}>

        {/* Toggle tab — vždy na levém okraji mapy */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, paddingLeft: '6px' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Skrýt panel' : 'Otevřít panel'}
            style={{
              width: '20px',
              height: '72px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              color: 'rgba(255,255,255,0.85)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            {sidebarOpen ? '‹' : '›'}
          </button>
        </div>

        {/* Obsah mapy */}
        <div style={{ flex: 1, padding: '12px', position: 'relative' }}>

        {/* Floating lišta při zavřeném sidebaru */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 500,
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          opacity: sidebarOpen ? 0 : 1,
          pointerEvents: sidebarOpen ? 'none' : 'auto',
          transition: 'opacity 0.25s ease 0.1s',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className="font-playfair" style={{
              background: 'linear-gradient(135deg, #1C3D34, #2E5E52)',
              color: 'white',
              borderRadius: '14px',
              padding: '10px 18px',
              fontSize: '17px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              letterSpacing: '-0.3px',
              boxShadow: '0 4px 16px rgba(20,40,35,0.3)',
            }}>
              🌿 Teramapa
            </div>
          </Link>

          {/* Vyhledávání */}
          <div style={{
            flex: 1,
            background: 'white',
            borderRadius: '14px',
            padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 4px 20px rgba(20,40,35,0.2)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0A89E" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Hledat město nebo jméno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', color: '#2A2A2A' }}
            />
          </div>
        </div>

        <div style={{
          height: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(20,40,35,0.1)',
        }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#B0A89E' }}>
              Načítám terapeuty…
            </div>
          ) : (
            <MapComponent therapists={filtered} onSelect={setSelectedTherapist} search={search} sidebarOpen={sidebarOpen} />
          )}
        </div>
        </div>
      </div>

      {/* ── Slide-out panel ── */}
      <TherapistPanel
        therapist={selectedTherapist}
        onClose={() => setSelectedTherapist(null)}
      />
    </div>
    </div>
  )
}
