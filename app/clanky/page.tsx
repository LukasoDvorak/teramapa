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
    perex: 'Celostní přístup ke zdraví není módní trend — je to návrat k tomu, co medicína věděla po staletí, než ji specializace rozdělila na stále menší části.',
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
    perex: 'Rozhovor s terapeutkou Petrou Nováčkovou o tom, jak se mění postoj lidí k péči o tělo a proč je pravidelný kontakt s tělem důležitý pro duševní zdraví.',
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
    perex: 'Arteterapie není o umění. Je o přístupu k vnitřnímu světu cestou, která obchází racionální bariéry. Co se děje, když vezmeme do ruky štětec místo slov?',
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
    perex: 'Výzkumy posledních let ukazují propojení střevního mikrobiomu s náladou, úzkostí i kvalitou spánku. Jak toto poznání mění přístup výživových poradců?',
    autor: 'Redakce Teramapa',
    datum: '29. března 2025',
    cteniMin: 6,
    emoji: '🥗',
    bgFrom: '#3A3010',
    bgTo: '#706020',
  },
]

function KategoriePill({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      background: color + '18',
      color: color,
      border: `1px solid ${color}44`,
      borderRadius: '20px',
      padding: '4px 12px',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.3px',
      textTransform: 'uppercase',
    }}>
      {label}
    </span>
  )
}

function MetaLine({ autor, datum, min }: { autor: string; datum: string; min: number }) {
  return (
    <p style={{ fontSize: '12px', color: '#9A9088', margin: 0 }}>
      {autor} · {datum} · {min} min čtení
    </p>
  )
}

function BrzyBadge() {
  return (
    <span style={{
      fontSize: '11px',
      color: '#B0A89E',
      background: '#EDE8E0',
      borderRadius: '6px',
      padding: '3px 9px',
      fontWeight: 500,
    }}>
      Brzy
    </span>
  )
}

function ArticleVisual({ emoji, bgFrom, bgTo, height = '100%' }: { emoji: string; bgFrom: string; bgTo: string; height?: string }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)`,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '72px',
      flexShrink: 0,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle dot pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }} xmlns="http://www.w3.org/2000/svg">
        <pattern id={`dots-${emoji}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="white"/>
        </pattern>
        <rect width="100%" height="100%" fill={`url(#dots-${emoji})`}/>
      </svg>
      <span style={{ opacity: 0.45, position: 'relative', zIndex: 1 }}>{emoji}</span>
    </div>
  )
}

export default function Clanky() {
  const [featured, ...rest] = CLANKY
  const [second, third, ...listItems] = rest

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

        {/* ── HERO článek ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderRadius: '28px',
          overflow: 'hidden',
          border: '1px solid #EDE8E0',
          boxShadow: '0 8px 40px rgba(20,40,35,0.08)',
          marginBottom: '24px',
          minHeight: '380px',
        }}>
          <ArticleVisual emoji={featured.emoji} bgFrom={featured.bgFrom} bgTo={featured.bgTo} />

          <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'white' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <KategoriePill label={featured.kategorie} color={featured.kategorieColor} />
                <span style={{ fontSize: '11px', color: '#B0A89E', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Doporučujeme</span>
              </div>
              <h2 className="font-playfair" style={{
                fontSize: 'clamp(22px, 2.5vw, 30px)',
                fontWeight: 600,
                color: '#1C3D34',
                lineHeight: 1.25,
                marginBottom: '18px',
                letterSpacing: '-0.3px',
              }}>
                {featured.titulek}
              </h2>
              <p style={{ fontSize: '15px', color: '#5A6A64', lineHeight: 1.8, margin: 0 }}>
                {featured.perex}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #EDE8E0' }}>
              <MetaLine autor={featured.autor} datum={featured.datum} min={featured.cteniMin} />
              <BrzyBadge />
            </div>
          </div>
        </div>

        {/* ── Druhý řádek: 3/5 + 2/5 ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: '24px',
          marginBottom: '24px',
        }}>
          {/* Větší karta */}
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid #EDE8E0',
            boxShadow: '0 4px 20px rgba(20,40,35,0.05)',
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
          }}>
            <ArticleVisual emoji={second.emoji} bgFrom={second.bgFrom} bgTo={second.bgTo} height="180px" />
            <div style={{ padding: '28px 30px 28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ marginBottom: '14px' }}>
                  <KategoriePill label={second.kategorie} color={second.kategorieColor} />
                </div>
                <h3 className="font-playfair" style={{ fontSize: '20px', fontWeight: 600, color: '#1C3D34', lineHeight: 1.3, marginBottom: '12px' }}>
                  {second.titulek}
                </h3>
                <p style={{ fontSize: '14px', color: '#5A6A64', lineHeight: 1.7, margin: 0 }}>
                  {second.perex}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #EDE8E0' }}>
                <MetaLine autor={second.autor} datum={second.datum} min={second.cteniMin} />
                <BrzyBadge />
              </div>
            </div>
          </div>

          {/* Menší karta — výraznější, tmavé pozadí */}
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            background: `linear-gradient(160deg, ${third.bgFrom}, ${third.bgTo})`,
            boxShadow: '0 4px 20px rgba(20,40,35,0.1)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', bottom: '-20px', right: '-10px', fontSize: '100px', opacity: 0.12, lineHeight: 1 }}>
              {third.emoji}
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.9)',
                  borderRadius: '20px',
                  padding: '4px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.3px',
                  textTransform: 'uppercase',
                }}>
                  {third.kategorie}
                </span>
              </div>
              <h3 className="font-playfair" style={{ fontSize: '21px', fontWeight: 600, color: 'white', lineHeight: 1.3, marginBottom: '14px' }}>
                {third.titulek}
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>
                {third.perex}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '28px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.12)', position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                {third.datum} · {third.cteniMin} min
              </p>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', padding: '3px 9px' }}>Brzy</span>
            </div>
          </div>
        </div>

        {/* ── Horizontální seznam ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {listItems.map((clanek, i) => (
            <div
              key={clanek.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '4px 1fr auto',
                gap: '0 28px',
                alignItems: 'center',
                padding: '28px 32px',
                background: 'white',
                borderRadius: i === 0 ? '20px 20px 4px 4px' : i === listItems.length - 1 ? '4px 4px 20px 20px' : '4px',
                border: '1px solid #EDE8E0',
                cursor: 'default',
              }}
            >
              {/* Barevný pruh vlevo */}
              <div style={{
                width: '4px',
                height: '100%',
                minHeight: '52px',
                background: clanek.kategorieColor,
                borderRadius: '4px',
                alignSelf: 'stretch',
              }} />

              {/* Text */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <KategoriePill label={clanek.kategorie} color={clanek.kategorieColor} />
                  <MetaLine autor={clanek.autor} datum={clanek.datum} min={clanek.cteniMin} />
                </div>
                <h3 className="font-playfair" style={{ fontSize: '18px', fontWeight: 600, color: '#1C3D34', lineHeight: 1.3, margin: '0 0 8px' }}>
                  {clanek.titulek}
                </h3>
                <p style={{ fontSize: '13px', color: '#7A8C85', lineHeight: 1.6, margin: 0 }}>
                  {clanek.perex}
                </p>
              </div>

              {/* Emoji + brzy */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingLeft: '8px' }}>
                <span style={{ fontSize: '28px', opacity: 0.5 }}>{clanek.emoji}</span>
                <BrzyBadge />
              </div>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div style={{
          marginTop: '40px',
          padding: '22px 28px',
          background: 'linear-gradient(135deg, #1C3D34, #2E5E52)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <span style={{ fontSize: '22px' }}>✍️</span>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'white', margin: '0 0 3px' }}>
              Články jsou teprve na cestě
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              Tady vidíš náhled budoucích témat. Skutečné texty začneme publikovat brzy.
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
