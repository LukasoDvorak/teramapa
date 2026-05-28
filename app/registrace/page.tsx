'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { ALL_THERAPY_TYPES, TherapyType } from '../data/therapists'

export default function RegistracePage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    therapy_types: [] as TherapyType[],
    address: '',
    city: '',
    phone: '',
    website: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const toggleTherapyType = (type: TherapyType) => {
    setForm((prev) => ({
      ...prev,
      therapy_types: prev.therapy_types.includes(type)
        ? prev.therapy_types.filter((t) => t !== type)
        : [...prev.therapy_types, type],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. Geocoding adresy
      const query = `${form.address}, ${form.city}, Česká republika`
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'cs' } }
      )
      const geoData = await geoRes.json()

      if (!geoData.length) {
        setError('Adresu se nepodařilo najít na mapě. Zkontroluj ulici a město a zkus znovu.')
        setLoading(false)
        return
      }

      const lat = parseFloat(geoData[0].lat)
      const lng = parseFloat(geoData[0].lon)

      // 2. Vytvoření účtu
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      })

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('Tento email je již registrován. Přihlas se místo toho.')
        } else {
          setError('Chyba při vytváření účtu: ' + authError.message)
        }
        setLoading(false)
        return
      }

      const userId = authData.user?.id

      // 3. Vytvoření profilu terapeuta
      const { error: dbError } = await supabase.from('therapists').insert({
        name: form.name,
        therapy_types: form.therapy_types,
        address: form.address,
        city: form.city,
        lat,
        lng,
        phone: form.phone || null,
        website: form.website || null,
        description: form.description,
        user_id: userId,
        approved: false,
      })

      if (dbError) throw dbError

      setSuccess(true)
    } catch {
      setError('Něco se pokazilo. Zkus to prosím znovu.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registrace proběhla!</h2>
          <p className="text-gray-500 mb-2">Tvůj profil byl odeslán ke schválení.</p>
          <p className="text-gray-400 text-sm mb-6">Jakmile tě admin schválí, zobrazíš se na mapě. Přihlas se kdykoliv a zkontroluj stav.</p>
          <Link
            href="/prihlaseni"
            className="inline-block bg-indigo-600 text-white rounded-lg px-6 py-2.5 font-medium text-sm hover:bg-indigo-700 transition-colors"
          >
            Přihlásit se
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-indigo-600">TERAMAPA</Link>
        <span className="text-gray-400 text-sm">/ Registrace terapeuta</span>
      </header>

      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Přidej se na mapu</h1>
        <p className="text-gray-500 mb-8">Základní registrace je zdarma. Profil se zobrazí po schválení.</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">

          {/* Přihlašovací údaje */}
          <div className="pb-4 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Přihlašovací údaje</p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="jana@example.cz"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heslo <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Alespoň 6 znaků"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Profil */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Profil</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jméno a titul <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Mgr. Jana Nováková"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Typy terapií <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_THERAPY_TYPES.map((type) => {
                const isActive = form.therapy_types.includes(type)
                return (
                  <button
                    type="button"
                    key={type}
                    onClick={() => toggleTherapyType(type)}
                    className={`px-3 py-1 rounded-full text-sm border-2 font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-gray-300 text-gray-600 hover:border-indigo-400'
                    }`}
                  >
                    {type}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ulice a číslo <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Václavské náměstí 12"
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Město <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Praha"
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <input
              type="tel"
              placeholder="+420 731 123 456"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Web</label>
            <input
              type="url"
              placeholder="https://www.mujweb.cz"
              value={form.website}
              onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Popis <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Pár vět o tobě a tvé praxi..."
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading || form.therapy_types.length === 0}
            className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Ukládám...' : 'Vytvořit účet a odeslat ke schválení'}
          </button>

          <p className="text-center text-sm text-gray-400">
            Už máš účet?{' '}
            <Link href="/prihlaseni" className="text-indigo-600 hover:underline">
              Přihlas se
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}
