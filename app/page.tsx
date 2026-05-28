'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ALL_THERAPY_TYPES, TherapyType, Therapist } from './data/therapists'
import { supabase } from './lib/supabase'
import TherapistPanel from './components/TherapistPanel'

const MapComponent = dynamic(() => import('./components/MapComponent'), { ssr: false })

const THERAPY_COLORS: Record<TherapyType, string> = {
  'Psychoterapie': '#6366f1',
  'Fyzioterapie': '#22c55e',
  'Masáže': '#f97316',
  'Osteopatie': '#14b8a6',
  'Arteterapie': '#ec4899',
  'Výživové poradenství': '#eab308',
}

export default function Home() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<TherapyType[]>([])
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)

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

  const filtered = activeFilters.length === 0
    ? therapists
    : therapists.filter((t) => t.therapy_types.some((type) => activeFilters.includes(type)))

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 py-3 border-b border-gray-200 bg-white z-10">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-600">TERAMAPA</h1>
        <span className="text-sm text-gray-400 hidden sm:block">
          Najdi terapeuta ve svém okolí
        </span>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {loading ? 'Načítám...' : `${filtered.length} ${filtered.length === 1 ? 'terapeut' : filtered.length < 5 ? 'terapeuti' : 'terapeutů'}`}
          </span>
          <Link
            href="/prihlaseni"
            className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Přihlásit se
          </Link>
        </div>
      </header>

      {/* Filtry */}
      <div className="flex flex-wrap gap-2 px-6 py-3 border-b border-gray-100 bg-gray-50">
        {ALL_THERAPY_TYPES.map((type) => {
          const isActive = activeFilters.includes(type)
          const color = THERAPY_COLORS[type]
          return (
            <button
              key={type}
              onClick={() => toggleFilter(type)}
              style={isActive ? { background: color, borderColor: color, color: 'white' } : { borderColor: color, color: color }}
              className="px-3 py-1 rounded-full text-sm font-medium border-2 transition-all"
            >
              {type}
            </button>
          )
        })}
        {activeFilters.length > 0 && (
          <button
            onClick={() => setActiveFilters([])}
            className="px-3 py-1 rounded-full text-sm font-medium border-2 border-gray-300 text-gray-500 hover:bg-gray-200 transition-all"
          >
            Zrušit filtry ×
          </button>
        )}
      </div>

      {/* Mapa */}
      <div className="flex-1 relative">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Načítám terapeuty...
          </div>
        ) : (
          <MapComponent therapists={filtered} onSelect={setSelectedTherapist} />
        )}
      </div>

      {/* Slide-out panel */}
      <TherapistPanel
        therapist={selectedTherapist}
        onClose={() => setSelectedTherapist(null)}
      />
    </div>
  )
}
