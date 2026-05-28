'use client'

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
    bgFrom: '#3D2E6B',
    bgTo: '#6B5AAD',
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
    bgFrom: '#1E4A30',
    bgTo: '#3D7A55',
  },
  {
    id: 3,
    kategorie: 'Celostní péče',
    kategorieColor: '#5AAEA6',
    titulek: 'Co znamená vnímat tělo jako celek',
    perex: 'Celostní přístup ke zdraví není módní trend — je to návrat k tomu, co medicína věděla po staletí, než ji specializace rozdělila.',
    autor: 'Anna Dvořáková',
    datum: '24. dubna 2025',
    cteniMin: 6,
    emoji: '🌿',
    bgFrom: '#1A4A48',
    bgTo: '#2E7A74',
  },
  {
    id: 4,
    kategorie: 'Rozhovor',
    kategorieColor: '#D4956A',
    titulek: '„Masáž není luxus. Je to péče."',
    perex: 'Rozhovor s terapeutkou Petrou Nováčkovou o tom, proč je pravidelný kontakt s tělem důležitý pro duševní zdraví.',
    autor: 'Redakce Teramapa',
    datum: '15. dubna 2025',
    cteniMin: 8,
    emoji: '💬',
    bgFrom: '#5A3018',
    bgTo: '#A06030',
  },
  {
    id: 5,
    kategorie: 'Arteterapie',
    kategorieColor: '#D47EA7',
    titulek: 'Jak kresba pomáhá tam, kde slova nestačí',
    perex: 'Arteterapie není o umění. Je o přístupu k vnitřnímu světu cestou, která obchází racionální bariéry.',
    autor: 'Redakce Teramapa',
    datum: '7. dubna 2025',
    cteniMin: 5,
    emoji: '🎨',
    bgFrom: '#5A1E3A',
    bgTo: '#A04070',
  },
  {
    id: 6,
    kategorie: 'Výživa',
    kategorieColor: '#B8A050',
    titulek: 'Střevo jako druhý mozek',
    perex: 'Výzkumy posledních let ukazují propojení střevního mikrobiomu s náladou, úzkostí i kvalitou spánku.',
    autor: 'Redakce Teramapa',
    datum: '29. března 2025',
    cteniMin: 6,
    emoji: '🥗',
    bgFrom: '#3A3010',
    bgTo: '#706020',
  },
]

export default function Clanky() {
  const [c1, c2, c3, c4, c5, c6] = CLANKY

  return (
    <div style={{ background: '#FDFAF6', minHeight: '100vh' }}>
      <Navigation variant="light" />

      {/* ── Masthead ── */}
      <div style={{ paddingTop: '88px', borderBottom: '1px solid #2A2A2A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 40px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h1 className="font-playfair" style={{
              fontSize: 'clamp(42px, 6vw, 72px)',
              fontWeight: 600,
              color: '#1C3D34',
              letterSpacing: '-1.5px',
              lineHeight: 1,
              margin: 0,
            }}>
              Články
            </h1>
            <div style={{ textAlign: 'right', paddingBottom: '8px' }}>
              <p style={{ fontSize: '11px', color: '#9A9088', margin: '0 0 2px', letterSpacing: '1px', textTransform: 'uppercase' }}>Projekt Propojení</p>
              <p style={{ fontSize: '11px', color: '#B0A89E', margin: 0 }}>Jaro 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 80px' }}>

        {/* ── HERO ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '0',
          borderBottom: '1px solid #D8D0C8',
          paddingBottom: '0',
        }}>
          {/* Text */}
          <div style={{ padding: '52px 52px 52px 0', borderRight: '1px solid #D8D0C8' }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: c1.kategorieColor,
              marginBottom: '20px',
            }}>
              {c1.kategorie}
            </p>
            <h2 className="font-playfair" style={{
              fontSize: 'clamp(28px, 3.5vw, 46px)',
              fontWeight: 600,
              color: '#1C3D34',
              lineHeight: 1.15,
              letterSpacing: '-0.8px',
              marginBottom: '22px',
            }}>
              {c1.titulek}
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#5A6A64',
              lineHeight: 1.85,
              marginBottom: '32px',
              maxWidth: '480px',
            }}>
              {c1.perex}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <p style={{ fontSize: '12px', color: '#9A9088', margin: 0 }}>
                {c1.autor}
              </p>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#C8C0B8', display: 'inline-block' }} />
              <p style={{ fontSize: '12px', color: '#9A9088', margin: 0 }}>{c1.datum}</p>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#C8C0B8', display: 'inline-block' }} />
              <p style={{ fontSize: '12px', color: '#9A9088', margin: 0 }}>{c1.cteniMin} min čtení</p>
              <span style={{
                fontSize: '10px',
                color: '#B0A89E',
                background: '#EDE8E0',
                padding: '2px 8px',
                borderRadius: '3px',
                letterSpacing: '0.5px',
              }}>BRZY</span>
            </div>
          </div>

          {/* Vizuál */}
          <div style={{
            background: `linear-gradient(160deg, ${c1.bgFrom}, ${c1.bgTo})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '96px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '320px',
          }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }} xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)"/>
            </svg>
            <span style={{ opacity: 0.4, position: 'relative', zIndex: 1 }}>{c1.emoji}</span>
          </div>
        </div>

        {/* ── Tři články vedle sebe ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          borderBottom: '1px solid #D8D0C8',
        }}>
          {[c2, c3, c4].map((c, i) => (
            <div key={c.id} style={{
              padding: '40px 36px',
              borderRight: i < 2 ? '1px solid #D8D0C8' : 'none',
            }}>
              {/* Číslovaný vizuál */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '24px',
              }}>
                <p style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: c.kategorieColor,
                  margin: 0,
                }}>
                  {c.kategorie}
                </p>
                <span style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#EDE8E0',
                  lineHeight: 1,
                  fontFamily: 'Georgia, serif',
                }}>
                  0{i + 2}
                </span>
              </div>

              <h3 className="font-playfair" style={{
                fontSize: '19px',
                fontWeight: 600,
                color: '#1C3D34',
                lineHeight: 1.35,
                marginBottom: '12px',
                letterSpacing: '-0.2px',
              }}>
                {c.titulek}
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#7A8C85',
                lineHeight: 1.75,
                marginBottom: '24px',
              }}>
                {c.perex}
              </p>
              <p style={{ fontSize: '11px', color: '#B0A89E', margin: 0 }}>
                {c.datum} · {c.cteniMin} min
              </p>
            </div>
          ))}
        </div>

        {/* ── Spodní dva — horizontální ── */}
        {[c5, c6].map((c, i) => (
          <div
            key={c.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 140px',
              gap: '0 40px',
              alignItems: 'center',
              padding: '32px 0',
              borderBottom: '1px solid #D8D0C8',
            }}
          >
            {/* Velké číslo */}
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: '64px',
                fontWeight: 700,
                color: '#EDE8E0',
                lineHeight: 1,
                fontFamily: 'Georgia, serif',
                display: 'block',
              }}>
                0{i + 5}
              </span>
            </div>

            {/* Text */}
            <div>
              <p style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: c.kategorieColor,
                marginBottom: '8px',
              }}>
                {c.kategorie}
              </p>
              <h3 className="font-playfair" style={{
                fontSize: '21px',
                fontWeight: 600,
                color: '#1C3D34',
                lineHeight: 1.3,
                marginBottom: '8px',
                letterSpacing: '-0.2px',
              }}>
                {c.titulek}
              </h3>
              <p style={{ fontSize: '13px', color: '#7A8C85', lineHeight: 1.7, margin: 0 }}>
                {c.perex}
              </p>
            </div>

            {/* Meta */}
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '12px', color: '#9A9088', margin: '0 0 6px' }}>{c.autor}</p>
              <p style={{ fontSize: '12px', color: '#B0A89E', margin: '0 0 10px' }}>{c.datum}</p>
              <span style={{
                fontSize: '10px',
                color: '#B0A89E',
                background: '#EDE8E0',
                padding: '2px 8px',
                borderRadius: '3px',
                letterSpacing: '0.5px',
              }}>BRZY</span>
            </div>
          </div>
        ))}

        {/* Zápatí editoriálu */}
        <div style={{
          paddingTop: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: '13px', color: '#B0A89E', margin: 0, fontStyle: 'italic' }}>
            Texty začneme publikovat brzy — děkujeme za trpělivost.
          </p>
          <span className="font-playfair" style={{ fontSize: '16px', color: '#D8D0C8', fontStyle: 'italic' }}>
            Teramapa
          </span>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ background: '#1C3D34', padding: '40px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
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
