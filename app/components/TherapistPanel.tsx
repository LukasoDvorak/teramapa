'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Therapist, TherapyType } from '../data/therapists'
import { supabase } from '../lib/supabase'

const THERAPY_COLORS: Record<TherapyType, string> = {
  'Psychoterapie': '#6366f1',
  'Fyzioterapie': '#22c55e',
  'Masáže': '#f97316',
  'Osteopatie': '#14b8a6',
  'Arteterapie': '#ec4899',
  'Výživové poradenství': '#eab308',
}

interface Props {
  therapist: Therapist | null
  onClose: () => void
}

export default function TherapistPanel({ therapist, onClose }: Props) {
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    if (!therapist) { setPhotos([]); return }
    supabase
      .from('therapist_photos')
      .select('url')
      .eq('therapist_id', therapist.id)
      .then(({ data }) => {
        if (data) setPhotos(data.map((p: { url: string }) => p.url))
      })
  }, [therapist?.id])

  return (
    <>
      {therapist && (
        <div className="fixed inset-0 bg-black/20 z-[999] sm:hidden" onClick={onClose} />
      )}

      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-[1000] overflow-y-auto ${
        therapist ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {therapist && (
          <>
            {/* Foto hlavička */}
            <div className="relative">
              {therapist.profile_photo_url ? (
                <img
                  src={therapist.profile_photo_url}
                  alt={therapist.name}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-52 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <span className="text-6xl opacity-40">👤</span>
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-900 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Název a typy */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{therapist.name}</h2>
                <div className="flex flex-wrap gap-1.5">
                  {therapist.therapy_types.map((type) => (
                    <span
                      key={type}
                      style={{ background: THERAPY_COLORS[type] }}
                      className="text-white text-xs px-2.5 py-1 rounded-full font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Místo */}
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <span>📍</span> {therapist.address}, {therapist.city}
              </p>

              {/* Popis */}
              <p className="text-sm text-gray-600 leading-relaxed">{therapist.description}</p>

              {/* Galerie */}
              {photos.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Fotografie</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {photos.map((url, i) => (
                      <img key={i} src={url} alt="" className="w-full h-20 object-cover rounded-lg" />
                    ))}
                  </div>
                </div>
              )}

              {/* Kontakt */}
              <div className="space-y-2">
                {therapist.phone && (
                  <a href={`tel:${therapist.phone}`} className="flex items-center gap-2 text-sm text-indigo-600 hover:underline">
                    <span>📞</span> {therapist.phone}
                  </a>
                )}
                {therapist.website && (
                  <a href={therapist.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-indigo-600 hover:underline">
                    <span>🌐</span> Navštívit web
                  </a>
                )}
              </div>

              {/* Tlačítko celý profil */}
              <Link
                href={`/terapeut?id=${therapist.id}`}
                className="flex items-center justify-center w-full bg-indigo-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Zobrazit celý profil →
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
