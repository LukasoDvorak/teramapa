'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { ALL_THERAPY_TYPES, TherapyType, Therapist } from '../data/therapists'

export default function DashboardPage() {
  const router = useRouter()
  const [therapist, setTherapist] = useState<Therapist | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    therapy_types: [] as TherapyType[],
    address: '',
    city: '',
    phone: '',
    website: '',
    description: '',
  })

  const loadProfile = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/prihlaseni')
      return
    }

    const { data } = await supabase
      .from('therapists')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (data) {
      setTherapist(data as Therapist)
      setForm({
        name: data.name,
        therapy_types: data.therapy_types,
        address: data.address,
        city: data.city,
        phone: data.phone || '',
        website: data.website || '',
        description: data.description,
      })
    }
    setLoading(false)
  }, [router])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const toggleTherapyType = (type: TherapyType) => {
    setForm((prev) => ({
      ...prev,
      therapy_types: prev.therapy_types.includes(type)
        ? prev.therapy_types.filter((t) => t !== type)
        : [...prev.therapy_types, type],
    }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!therapist) return
    setSaving(true)
    setError('')
    setSaved(false)

    const { error } = await supabase
      .from('therapists')
      .update({
        name: form.name,
        therapy_types: form.therapy_types,
        address: form.address,
        city: form.city,
        phone: form.phone || null,
        website: form.website || null,
        description: form.description,
      })
      .eq('id', therapist.id)

    if (error) {
      setError('Uložení se nezdařilo. Zkus to znovu.')
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Načítám...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">TERAMAPA</Link>
        <span className="text-gray-400 text-sm">/ Můj profil</span>
        <button
          onClick={handleLogout}
          className="ml-auto text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Odhlásit se
        </button>
      </header>

      <main className="max-w-xl mx-auto px-4 py-10">

        {/* Stav schválení */}
        {therapist && !therapist.approved && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
            <span className="text-yellow-500 text-lg">⏳</span>
            <div>
              <p className="text-sm font-medium text-yellow-800">Čeká na schválení</p>
              <p className="text-sm text-yellow-600">Tvůj profil ještě není viditelný na mapě. Jakmile tě admin schválí, zobrazíš se.</p>
            </div>
          </div>
        )}

        {therapist && therapist.approved && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <div>
              <p className="text-sm font-medium text-green-800">Profil je aktivní</p>
              <p className="text-sm text-green-600">Jsi viditelný na mapě.</p>
            </div>
          </div>
        )}

        {!therapist && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6">
            <p className="text-sm text-blue-700">Nemáš ještě profil. <Link href="/registrace" className="font-medium underline">Vytvoř ho zde.</Link></p>
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Upravit profil</h1>

        <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jméno a titul *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Typy terapií *</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Ulice a číslo *</label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Město *</label>
              <input
                type="text"
                required
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
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Web</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Popis *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
          {saved && <p className="text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg">✓ Profil byl uložen</p>}

          <button
            type="submit"
            disabled={saving || form.therapy_types.length === 0}
            className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Ukládám...' : 'Uložit změny'}
          </button>
        </form>
      </main>
    </div>
  )
}
