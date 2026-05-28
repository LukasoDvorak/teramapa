'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from './components/Navigation'
import TherapistPanel from './components/TherapistPanel'
import { Therapist, TherapyType } from './data/therapists'
import { supabase } from './lib/supabase'

const MapComponent = dynamic(() => import('./components/MapComponent'), { ssr: false })

const THERAPY_COLORS: Record<TherapyType, string> = {
  'Psychoterapie': '#9B8FC8',
  'Fyzioterapie': '#6AAF82',
  'Masáže': '#D4956A',
  'Osteopatie': '#5AAEA6',
  'Arteterapie': '#D47EA7',
  'Výživové poradenství': '#B8A050',
}

function LeafIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 44 C24 44 8 32 8 18 C8 10 15 4 24 4 C33 4 40 10 40 18 C40 32 24 44 24 44Z" fill="#2E5E52" opacity="0.15"/>
      <path d="M24 44 C24 44 8 32 8 18 C8 10 15 4 24 4 C33 4 40 10 40 18 C40 32 24 44 24 44Z" stroke="#2E5E52" strokeWidth="1.5" fill="none"/>
      <path d="M24 44 L24 16" stroke="#2E5E52" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M24 28 Q18 22 14 18" stroke="#2E5E52" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <path d="M24 22 Q30 16 34 14" stroke="#2E5E52" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
    </svg>
  )
}

const PILLARS = [
  {
    icon: '🌿',
    title: 'Tělo jako celek',
    text: 'Propojujeme péči o tělo, mysl i ducha. Věříme, že skutečné uzdravení nastává, když vnímáme člověka v celé jeho složitosti.',
  },
  {
    icon: '🤝',
    title: 'Důvěra a autenticita',
    text: 'Každý terapeut v naší síti prošel osobním výběrem. Hledáme lidi, pro které je práce s člověkem posláním, ne jen profesí.',
  },
  {
    icon: '🗺️',
    title: 'Snadné hledání',
    text: 'Přehledná mapa celé České republiky. Filtruj podle druhu péče, hledej podle města — a najdi terapeuta blízko tebe.',
  },
]

export default function Home() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [featuredTherapists, setFeaturedTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)

  useEffect(() => {
    async function fetchTherapists() {
      const { data, error } = await supabase.from('therapists').select('*').eq('approved', true)
      if (!error && data) {
        const all = data as Therapist[]
        setTherapists(all)
        // Featured: first 3 with photos, otherwise just first 3
        const withPhotos = all.filter((t) => t.profile_photo_url)
        setFeaturedTherapists((withPhotos.length >= 3 ? withPhotos : all).slice(0, 3))
      }
      setLoading(false)
    }
    fetchTherapists()
  }, [])

  return (
    <div style={{ background: '#FDFAF6', minHeight: '100vh' }}>
      <Navigation variant="light" />

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(160deg, #1C3D34 0%, #264D42 55%, #2E5E52 100%)',
        paddingTop: '120px',
        paddingBottom: '100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Dekorativní botanické prvky */}
        <div style={{ position: 'absolute', right: '-60px', top: '-40px', width: '480px', height: '600px', opacity: 0.07, pointerEvents: 'none' }}>
          <svg viewBox="0 0 480 600" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path d="M240 600 Q230 500 200 400 Q170 300 150 200 Q130 100 155 20" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round"/>
            <path d="M240 600 Q258 490 268 390 Q278 290 285 190 Q292 90 270 10" stroke="white" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
            <ellipse cx="142" cy="250" rx="55" ry="18" transform="rotate(-40 142 250)" fill="white"/>
            <ellipse cx="128" cy="180" rx="44" ry="14" transform="rotate(-50 128 180)" fill="white"/>
            <ellipse cx="155" cy="330" rx="48" ry="16" transform="rotate(-30 155 330)" fill="white"/>
            <ellipse cx="275" cy="260" rx="50" ry="16" transform="rotate(38 275 260)" fill="white"/>
            <ellipse cx="280" cy="185" rx="40" ry="14" transform="rotate(48 280 185)" fill="white"/>
            <ellipse cx="268" cy="340" rx="44" ry="14" transform="rotate(30 268 340)" fill="white"/>
          </svg>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '640px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '20px',
              padding: '6px 16px',
              marginBottom: '28px',
            }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>🌿 Projekt Propojení</span>
            </div>

            <h1 className="font-playfair" style={{
              fontSize: 'clamp(38px, 6vw, 64px)',
              fontWeight: 600,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              marginBottom: '24px',
            }}>
              Najdi terapeuta,<br />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>který ti rozumí</span>
            </h1>

            <p style={{
              fontSize: '17px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.75,
              marginBottom: '40px',
              maxWidth: '520px',
            }}>
              Mapa odborníků, kteří vnímají člověka jako celek — tělo, mysl i duši.
              Psychoterapeuti, fyzioterapeuti, maséři a další specialisté po celé České republice.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/mapa" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'white',
                color: '#1C3D34',
                padding: '14px 28px',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}>
                <span>🗺️</span> Otevřít mapu
              </Link>
              <Link href="/registrace" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.85)',
                padding: '14px 28px',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
                border: '1.5px solid rgba(255,255,255,0.25)',
              }}>
                Jsem terapeut →
              </Link>
            </div>

            {/* Statistika */}
            {!loading && therapists.length > 0 && (
              <div style={{ marginTop: '48px', display: 'flex', gap: '32px' }}>
                <div>
                  <p style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1 }}>{therapists.length}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>terapeutů</p>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.12)' }} />
                <div>
                  <p style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1 }}>6</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>oborů péče</p>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.12)' }} />
                <div>
                  <p style={{ fontSize: '28px', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1 }}>CZ</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>celá republika</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Embedded Map ── */}
      <section style={{ background: 'linear-gradient(180deg, #2E5E52 0%, #1C3D34 100%)', padding: '0' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px 60px',
        }}>
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            height: '420px',
            boxShadow: '0 24px 64px rgba(20,40,35,0.35)',
            border: '1px solid rgba(255,255,255,0.08)',
            marginTop: '-40px',
          }}>
            {loading ? (
              <div style={{ height: '100%', background: '#EDE8E0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9A9088', fontSize: '14px' }}>
                Načítám mapu…
              </div>
            ) : (
              <MapComponent
                therapists={therapists}
                onSelect={setSelectedTherapist}
                search=""
                sidebarOpen={true}
              />
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/mapa" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '10px 22px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.07)',
            }}>
              Zobrazit plnou mapu →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Tři pilíře ── */}
      <section style={{ background: '#FDFAF6', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#9A9088', marginBottom: '14px' }}>
              Naše hodnoty
            </p>
            <h2 className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, color: '#1C3D34', lineHeight: 1.2, margin: 0 }}>
              Proč Teramapa?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {PILLARS.map((pillar, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '32px',
                border: '1px solid #EDE8E0',
                boxShadow: '0 2px 16px rgba(20,40,35,0.04)',
              }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: 'linear-gradient(135deg, #EDE8E0, #F5F0E8)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                  marginBottom: '20px',
                }}>
                  {pillar.icon}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#1C3D34', marginBottom: '10px', lineHeight: 1.3 }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#7A8C85', lineHeight: 1.7, margin: 0 }}>
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured terapeuti ── */}
      {featuredTherapists.length > 0 && (
        <section style={{ background: '#F5F0E8', padding: '80px 32px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#9A9088', marginBottom: '14px' }}>
                  Terapeuti
                </p>
                <h2 className="font-playfair" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, color: '#1C3D34', lineHeight: 1.2, margin: 0 }}>
                  Seznamte se
                </h2>
              </div>
              <Link href="/mapa" style={{
                color: '#2E5E52',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                border: '1.5px solid #2E5E52',
                padding: '10px 20px',
                borderRadius: '10px',
                whiteSpace: 'nowrap',
              }}>
                Zobrazit všechny →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {featuredTherapists.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTherapist(t)}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid #EDE8E0',
                    boxShadow: '0 2px 16px rgba(20,40,35,0.06)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 0,
                  }}
                >
                  {/* Foto */}
                  {t.profile_photo_url ? (
                    <img
                      src={t.profile_photo_url}
                      alt={t.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '200px',
                      background: 'linear-gradient(135deg, #2A5248, #3D7068)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '48px', opacity: 0.3 }}>🌿</span>
                    </div>
                  )}

                  {/* Info */}
                  <div style={{ padding: '20px 22px 22px' }}>
                    <h3 className="font-playfair" style={{ fontSize: '18px', fontWeight: 600, color: '#1C3D34', margin: '0 0 4px' }}>
                      {t.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#9A9088', margin: '0 0 14px' }}>
                      {t.city}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
                      {t.therapy_types.map((type) => (
                        <span
                          key={type}
                          style={{
                            background: THERAPY_COLORS[type] + '18',
                            color: THERAPY_COLORS[type],
                            border: `1px solid ${THERAPY_COLORS[type]}33`,
                            borderRadius: '20px',
                            padding: '3px 10px',
                            fontSize: '11px',
                            fontWeight: 500,
                          }}
                        >
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
          </div>
        </section>
      )}

      {/* ── O projektu CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1C3D34 0%, #2E5E52 100%)',
        padding: '80px 32px',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <LeafIcon />
          <h2 className="font-playfair" style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 600,
            color: 'white',
            lineHeight: 1.2,
            margin: '24px 0 18px',
          }}>
            Projekt Propojení
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.8,
            marginBottom: '36px',
          }}>
            Věříme, že péče o člověka by neměla být rozdělena na „tělesnou" a „duševní".
            Hledáme odborníky, kteří vnímají tělo jako víc než fyzickou schránku —
            a propojujeme je s těmi, kdo takovou péči hledají.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/o-projektu" style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'white',
              color: '#1C3D34',
              padding: '13px 26px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              Více o projektu
            </Link>
            <Link href="/registrace" style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'transparent',
              color: 'rgba(255,255,255,0.8)',
              padding: '13px 26px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              border: '1.5px solid rgba(255,255,255,0.25)',
            }}>
              Přidat svůj profil
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#1C3D34', padding: '40px 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span className="font-playfair" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', fontWeight: 600 }}>
            Teramapa
          </span>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: 0 }}>
            © 2025 Projekt Propojení · Vytvořeno s péčí
          </p>
        </div>
      </footer>

      {/* Slide-out panel při kliknutí na terapeuta */}
      <TherapistPanel
        therapist={selectedTherapist}
        onClose={() => setSelectedTherapist(null)}
      />
    </div>
  )
}
