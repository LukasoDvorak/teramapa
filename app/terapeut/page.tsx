'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { Therapist, TherapyType } from '../data/therapists'

const THERAPY_COLORS: Record<TherapyType, string> = {
  'Psychoterapie': '#6366f1',
  'Fyzioterapie': '#22c55e',
  'Masáže': '#f97316',
  'Osteopatie': '#14b8a6',
  'Arteterapie': '#ec4899',
  'Výživové poradenství': '#eab308',
}

function TerapeutDetail() {
  const params = useSearchParams()
  const id = params.get('id')
  const [therapist, setTherapist] = useState<Therapist | null>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      supabase.from('therapists').select('*').eq('id', id).single(),
      supabase.from('therapist_photos').select('url').eq('therapist_id', id),
    ]).then(([{ data: t }, { data: p }]) => {
      if (t) setTherapist(t as Therapist)
      if (p) setPhotos(p.map((x: { url: string }) => x.url))
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Načítám profil...</p>
      </div>
    )
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Terapeut nenalezen.</p>
          <Link href="/" className="text-indigo-600 hover:underline">← Zpět na mapu</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">TERAMAPA</Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">← Zpět na mapu</Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Profil hlavička */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6">
          {therapist.profile_photo_url ? (
            <img
              src={therapist.profile_photo_url}
              alt={therapist.name}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <span className="text-8xl opacity-30">👤</span>
            </div>
          )}

          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{therapist.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {therapist.therapy_types.map((type) => (
                <span
                  key={type}
                  style={{ background: THERAPY_COLORS[type] }}
                  className="text-white text-sm px-3 py-1 rounded-full font-medium"
                >
                  {type}
                </span>
              ))}
            </div>
            <p className="text-gray-500 flex items-center gap-2 mb-4">
              <span>📍</span> {therapist.address}, {therapist.city}
            </p>
            <p className="text-gray-600 leading-relaxed">{therapist.description}</p>
          </div>
        </div>

        {/* Galerie */}
        {photos.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="font-bold text-gray-900 mb-4">Fotografie</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-full h-32 object-cover rounded-xl"
                />
              ))}
            </div>
          </div>
        )}

        {/* Kontakt */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Kontakt</h2>
          <div className="space-y-3">
            {therapist.phone && (
              <a href={`tel:${therapist.phone}`} className="flex items-center gap-3 text-indigo-600 hover:underline">
                <span>📞</span> {therapist.phone}
              </a>
            )}
            {therapist.website && (
              <a href={therapist.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-indigo-600 hover:underline">
                <span>🌐</span> {therapist.website}
              </a>
            )}
            {!therapist.phone && !therapist.website && (
              <p className="text-gray-400 text-sm">Kontaktní údaje nejsou k dispozici.</p>
            )}
          </div>
        </div>

        {/* Recenze — placeholder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recenze</h2>
            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">Brzy</span>
          </div>
          <p className="text-sm text-gray-400">Recenze budou dostupné brzy.</p>
        </div>
      </main>
    </div>
  )
}

export default function TerapeutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Načítám...</p>
      </div>
    }>
      <TerapeutDetail />
    </Suspense>
  )
}
