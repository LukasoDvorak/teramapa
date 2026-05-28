'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/o-projektu', label: 'O projektu' },
  { href: '/terapeuti', label: 'Terapeuti' },
  { href: '/mapa', label: 'Mapa' },
  { href: '/clanky', label: 'Články' },
]

interface Props {
  variant?: 'light' | 'dark'
}

export default function Navigation({ variant = 'light' }: Props) {
  const pathname = usePathname()

  const isDark = variant === 'dark'
  const textColor = isDark ? 'rgba(255,255,255,0.75)' : '#5A6A64'
  const activeColor = isDark ? 'white' : '#1C3D34'
  const borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#EDE8E0'
  const bg = isDark
    ? 'rgba(28,61,52,0.85)'
    : 'rgba(253,250,246,0.92)'

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 900,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      background: bg,
      borderBottom: `1px solid ${borderColor}`,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="font-playfair" style={{
            fontSize: '22px',
            fontWeight: 600,
            color: isDark ? 'white' : '#1C3D34',
            letterSpacing: '-0.3px',
          }}>
            Teramapa
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? activeColor : textColor,
                  background: isActive
                    ? (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(28,61,52,0.07)')
                    : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </Link>
            )
          })}

          {/* Přihlásit se */}
          <Link
            href="/prihlaseni"
            style={{
              marginLeft: '8px',
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: isDark ? 'white' : '#1C3D34',
              border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.3)' : '#1C3D34'}`,
              background: 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}
          >
            Přihlásit se
          </Link>
        </div>
      </div>
    </nav>
  )
}
