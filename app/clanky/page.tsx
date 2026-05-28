'use client'

import Link from 'next/link'
import Navigation from '../components/Navigation'

const CLANKY = [
  {
    id: 1,
    kategorie: 'Psychoterapie',
    kategorieColor: '#9B8FC8',
    titulek: 'Kdy je čas vyhledat psychoterapeuta?',
    perex: 'Mnoho lidí čeká, až bude „opravdu špatně". Přitom psychoterapie není jen krizová intervence — je to prostor pro hlubší pochopení sebe sama, které pomáhá i v každodenním životě.',
    autor: 'Anna Dvořáková',
    datum: '12. května 2025',
    cteniMin: 5,
    emoji: '🧠',
  },
  {
    id: 2,
    kategorie: 'Fyzioterapie',
    kategorieColor: '#6AAF82',
    titulek: 'Bolest zad není jen fyzický problém',
    perex: 'Fyzioterapeuti stále častěji mluví o tom, jak emoce a stres přispívají k chronické bolesti pohybového aparátu. Co říká výzkum a jak s tím pracovat?',
    autor: 'Redakce Teramapa',
    datum: '3. května 2025',
    cteniMin: 7,
    emoji: '🌱',
  },
  {
    id: 3,
    kategorie: 'Celostní péče',
    kategorieColor: '#5AAEA6',
    titulek: 'Co znamená vnímat tělo jako celek',
    perex: 'Celostní přístup ke zdraví není módní trend — je to návrat k tomu, co medicína věděla po staletí, než ji specializace rozdělila na stále menší části.',
    autor: 'Anna Dvořáková',
    datum: '24. dubna 2025',
    cteniMin: 6,
    emoji: '🌿',
  },
  {
    id: 4,
    kategorie: 'Rozhovor',
    kategorieColor: '#D4956A',
    titulek: '„Masáž není luxus. Je to péče."',
    perex: 'Rozhovor s terapeutkou Petrou Nováčkovou o tom, jak se mění postoj lidí k péči o tělo a proč je pravidelný kontakt s tělem důležitý pro duševní zdraví.',
    autor: 'Redakce Teramapa',
    datum: '15. dubna 2025',
    cteniMin: 8,
    emoji: '💬',
  },
  {
    id: 5,
    kategorie: 'Arteterapie',
    kategorieColor: '#D47EA7',
    titulek: 'Jak kresba pomáhá tam, kde slova nestačí',
    perex: 'Arteterapie není o umění. Je o přístupu k vnitřnímu světu cestou, která obchází racionální bariéry. Co se děje, když vezmeme do ruky štětec místo slov?',
    autor: 'Redakce Teramapa',
    datum: '7. dubna 2025',
    cteniMin: 5,
    emoji: '🎨',
  },
  {
    id: 6,
    kategorie: 'Výživa',
    kategorieColor: '#B8A050',
    titulek: 'Střevo jako druhý mozek — co to znamená v praxi',
    perex: 'Výzkumy posledních let ukazují propojení střevního mikrobiomu s náladou, úzkostí i kvalitou spánku. Jak toto poznání mění přístup výživových poradců?',
    autor: 'Redakce Teramapa',
    datum: '29. března 2025',
    cteniMin: 6,
    emoji: '🥗',
  },
]

const FEATURED = CLANKY[0]
const REST = CLANKY.slice(1)

export default function Clanky() {
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
            Články
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>
            Texty o celostní péči, terapii a cestě ke zdraví
          </p>
        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 32px 80px' }}>

        {/* Hlavní featured článek */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid #EDE8E0',
          boxShadow: '0 4px 24px rgba(20,40,35,0.06)',
          marginBottom: '40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '320px',
        }}>
          {/* Ilustrace */}
          <div style={{
            background: 'linear-gradient(135deg, #2A5248 0%, #3D7068 50%, #4A8070 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '80px',
            opacity: 1,
          }}>
            <span style={{ opacity: 0.5 }}>{FEATURED.emoji}</span>
          </div>

          {/* Text */}
          <div style={{ padding: '40px 40px 36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{
                background: FEATURED.kategorieColor + '18',
                color: FEATURED.kategorieColor,
                border: `1px solid ${FEATURED.kategorieColor}33`,
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 500,
              }}>
                {FEATURED.kategorie}
              </span>
              <span style={{ fontSize: '12px', color: '#9A9088' }}>Doporučujeme</span>
            </div>

            <h2 className="font-playfair" style={{
              fontSize: '26px',
              fontWeight: 600,
              color: '#1C3D34',
              lineHeight: 1.25,
              marginBottom: '16px',
            }}>
              {FEATURED.titulek}
            </h2>

            <p style={{
              fontSize: '14px',
              color: '#5A6A64',
              lineHeight: 1.75,
              marginBottom: '28px',
            }}>
              {FEATURED.perex}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 500, color: '#1C3D34', margin: 0 }}>{FEATURED.autor}</p>
                <p style={{ fontSize: '12px', color: '#9A9088', margin: '2px 0 0' }}>{FEATURED.datum} · {FEATURED.cteniMin} min čtení</p>
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'linear-gradient(135deg, #1C3D34, #2E5E52)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'default',
                opacity: 0.5,
              }}>
                Brzy k dispozici
              </span>
            </div>
          </div>
        </div>

        {/* Grid ostatních článků */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {REST.map((clanek) => (
            <div key={clanek.id} style={{
              background: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid #EDE8E0',
              boxShadow: '0 2px 12px rgba(20,40,35,0.04)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Barevný header */}
              <div style={{
                background: 'linear-gradient(135deg, #2A5248, #3D7068)',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
              }}>
                <span style={{ opacity: 0.4 }}>{clanek.emoji}</span>
              </div>

              <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  background: clanek.kategorieColor + '18',
                  color: clanek.kategorieColor,
                  border: `1px solid ${clanek.kategorieColor}33`,
                  borderRadius: '20px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 500,
                  display: 'inline-block',
                  marginBottom: '12px',
                  alignSelf: 'flex-start',
                }}>
                  {clanek.kategorie}
                </span>

                <h3 className="font-playfair" style={{
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#1C3D34',
                  lineHeight: 1.3,
                  marginBottom: '10px',
                  flex: 1,
                }}>
                  {clanek.titulek}
                </h3>

                <p style={{
                  fontSize: '13px',
                  color: '#7A8C85',
                  lineHeight: 1.65,
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                } as React.CSSProperties}>
                  {clanek.perex}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #EDE8E0', paddingTop: '14px' }}>
                  <p style={{ fontSize: '12px', color: '#9A9088', margin: 0 }}>
                    {clanek.datum} · {clanek.cteniMin} min
                  </p>
                  <span style={{ fontSize: '12px', color: '#9A9088', fontStyle: 'italic' }}>
                    Brzy…
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder note */}
        <div style={{
          marginTop: '48px',
          padding: '24px 28px',
          background: 'linear-gradient(135deg, #1C3D34, #2E5E52)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <span style={{ fontSize: '24px' }}>✍️</span>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'white', margin: '0 0 4px' }}>
              Články jsou teprve na cestě
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
              Tady vidíš náhled budoucích témat. Skutečné texty začneme publikovat brzy — sleduj nás.
            </p>
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
