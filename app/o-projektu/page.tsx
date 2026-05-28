'use client'

import Link from 'next/link'
import Navigation from '../components/Navigation'

const HODNOTY = [
  {
    icon: '🌿',
    title: 'Tělo jako víc než fyzická schránka',
    text: 'Hledáme odborníky, kteří vnímají tělo, mysl a duši jako celek — ne jako oddělené problémy k vyřešení. Takový přístup ke zdraví je pro nás základní podmínka.',
  },
  {
    icon: '🤝',
    title: 'Osobní výběr, ne algoritmický výpis',
    text: 'Každý terapeut v mapě prošel osobním kontaktem. Nejde nám o co největší databázi, ale o síť lidí, pro které je práce s člověkem posláním.',
  },
  {
    icon: '📷',
    title: 'Autentické portréty',
    text: 'Fotografie v přírodě, přirozeném světle, bez přehnaného stagingu. Chceme, aby člověk hledající pomoc viděl skutečnou tvář — ne marketingový obrázek.',
  },
  {
    icon: '💬',
    title: 'Hloubka před šířkou',
    text: 'Profily terapeutů odpovídají na 13 osobních otázek. Ne jen vzdělání a kontakt — ale pohled na svět, přístup k práci, co je pro ně v životě důležité.',
  },
]

const OTAZKY = [
  'Co tě přivedlo k tomuto oboru?',
  'Co pro tebe znamená zdraví?',
  'Jak vnímáš spojení těla a mysli?',
  'Co děláš, když se ti nedaří?',
  'Jaká kniha tě nejvíc ovlivnila?',
  'Co rád/a děláš mimo práci?',
]

export default function OProjektu() {
  return (
    <div style={{ background: '#FDFAF6', minHeight: '100vh' }}>
      <Navigation variant="light" />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, #1C3D34 0%, #264D42 55%, #2E5E52 100%)',
        paddingTop: '120px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Dekorace */}
        <div style={{ position: 'absolute', left: '-40px', bottom: '-60px', width: '320px', height: '420px', opacity: 0.06, pointerEvents: 'none' }}>
          <svg viewBox="0 0 320 420" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path d="M160 420 Q150 340 130 260 Q110 180 120 100 Q130 40 160 10" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round"/>
            <ellipse cx="108" cy="200" rx="52" ry="17" transform="rotate(-42 108 200)" fill="white"/>
            <ellipse cx="95" cy="140" rx="42" ry="14" transform="rotate(-52 95 140)" fill="white"/>
            <ellipse cx="118" cy="270" rx="46" ry="15" transform="rotate(-32 118 270)" fill="white"/>
          </svg>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '20px',
            padding: '6px 16px',
            marginBottom: '28px',
          }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.5px' }}>🌿 Projekt Propojení</span>
          </div>

          <h1 className="font-playfair" style={{
            fontSize: 'clamp(34px, 5vw, 56px)',
            fontWeight: 600,
            color: 'white',
            lineHeight: 1.15,
            letterSpacing: '-0.8px',
            marginBottom: '24px',
          }}>
            O projektu
          </h1>

          <p style={{
            fontSize: '17px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.8,
            maxWidth: '580px',
            margin: 0,
          }}>
            Teramapa vznikla z přesvědčení, že péče o člověka by neměla být roztříštěná.
            Chceme propojit ty, kdo hledají pomoc, s těmi, kdo ji umí dát celostně.
          </p>
        </div>
      </section>

      {/* Příběh */}
      <section style={{ padding: '80px 32px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#9A9088', marginBottom: '16px' }}>
              Proč to vzniklo
            </p>
            <h2 className="font-playfair" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 600, color: '#1C3D34', lineHeight: 1.25, marginBottom: '20px' }}>
              Cesta ke klidu by neměla být složitá
            </h2>
            <p style={{ fontSize: '15px', color: '#5A6A64', lineHeight: 1.8, marginBottom: '16px' }}>
              Když člověk hledá pomoc — ať fyzickou, psychickou nebo duchovní — narazí na roztříštěný svět reklam, doporučení od známých a stovky stránek bez kontextu. Chybí místo, kde by bylo vidět, <em>kdo ti může opravdu pomoct</em>.
            </p>
            <p style={{ fontSize: '15px', color: '#5A6A64', lineHeight: 1.8, margin: 0 }}>
              Teramapa je odpovědí na tuto mezeru. Ne jako další katalog, ale jako živá síť lidí, kteří sdílejí společný hodnotový základ.
            </p>
          </div>

          {/* Citát */}
          <div style={{
            background: 'linear-gradient(135deg, #1C3D34, #2E5E52)',
            borderRadius: '24px',
            padding: '36px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '120px', opacity: 0.06, lineHeight: 1 }}>❝</div>
            <p className="font-playfair" style={{
              fontSize: '19px',
              color: 'white',
              lineHeight: 1.65,
              fontStyle: 'italic',
              margin: '0 0 20px',
              position: 'relative',
              zIndex: 1,
            }}>
              „Hledáme odborníky, pro které je tělo víc než fyzická schránka."
            </p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: 0, position: 'relative', zIndex: 1 }}>
              Anna Dvořáková, zakladatelka projektu
            </p>
          </div>
        </div>
      </section>

      {/* Hodnoty */}
      <section style={{ background: '#F5F0E8', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#9A9088', marginBottom: '14px' }}>
              Co nás definuje
            </p>
            <h2 className="font-playfair" style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 600, color: '#1C3D34', lineHeight: 1.2, margin: 0 }}>
              Naše hodnoty
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {HODNOTY.map((h, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid #EDE8E0',
                boxShadow: '0 2px 12px rgba(20,40,35,0.04)',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'linear-gradient(135deg, #EDE8E0, #F5F0E8)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px',
                  marginBottom: '18px',
                }}>
                  {h.icon}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1C3D34', marginBottom: '10px', lineHeight: 1.35 }}>
                  {h.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#7A8C85', lineHeight: 1.7, margin: 0 }}>
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medailonky — 13 otázek */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#9A9088', marginBottom: '16px' }}>
                Profily terapeutů
              </p>
              <h2 className="font-playfair" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 600, color: '#1C3D34', lineHeight: 1.25, marginBottom: '20px' }}>
                13 otázek, které odhalí víc než životopis
              </h2>
              <p style={{ fontSize: '15px', color: '#5A6A64', lineHeight: 1.8, marginBottom: '16px' }}>
                Každý terapeut v Teramapě odpovídá na sadu osobních otázek. Nejde o výčet certifikátů — jde o pohled na svět, přístup k práci a k člověku.
              </p>
              <p style={{ fontSize: '15px', color: '#5A6A64', lineHeight: 1.8, margin: 0 }}>
                Fotografie vznikají v přírodě nebo doma — v přirozeném světle, bez přehnaného stagingu. Protože autenticita se nedá nainstalovat.
              </p>
            </div>

            {/* Příklady otázek */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {OTAZKY.map((q, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  padding: '14px 16px',
                  background: '#FDFAF6',
                  border: '1px solid #EDE8E0',
                  borderRadius: '12px',
                }}>
                  <span style={{
                    width: '22px', height: '22px', flexShrink: 0,
                    background: 'linear-gradient(135deg, #1C3D34, #2E5E52)',
                    borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', color: 'white', fontWeight: 700,
                  }}>
                    {i + 1}
                  </span>
                  <p style={{ fontSize: '13px', color: '#5A6A64', margin: 0, lineHeight: 1.5 }}>{q}</p>
                </div>
              ))}
              <p style={{ fontSize: '12px', color: '#9A9088', margin: '4px 0 0 4px' }}>
                … a dalších 7 otázek
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vize */}
      <section style={{
        background: 'linear-gradient(135deg, #1C3D34 0%, #2E5E52 100%)',
        padding: '80px 32px',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            Kam směřujeme
          </p>
          <h2 className="font-playfair" style={{
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 600,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}>
            Mapa je začátek
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '40px' }}>
            Do budoucna chceme budovat prostor pro setkávání — workshopy, konference a vzdělávací události, které propojují terapeuta s terapeutem i s klientem. Místo, kde celostní péče dostane hlas.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/mapa" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'white',
              color: '#1C3D34',
              padding: '13px 26px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              🗺️ Otevřít mapu
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

      {/* Footer */}
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
    </div>
  )
}
