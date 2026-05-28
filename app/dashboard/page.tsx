'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([])
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const profilePhotoRef = useRef<HTMLInputElement>(null)
  const galleryPhotoRef = useRef<HTMLInputElement>(null)

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
    if (!session) { router.push('/prihlaseni'); return }

    const [{ data: t }, { data: p }] = await Promise.all([
      supabase.from('therapists').select('*').eq('user_id', session.user.id).single(),
      supabase.from('therapist_photos').select('url').eq('therapist_id',
        (await supabase.from('therapists').select('id').eq('user_id', session.user.id).single()).data?.id
      ),
    ])

    if (t) {
      setTherapist(t as Therapist)
      setForm({
        name: t.name, therapy_types: t.therapy_types,
        address: t.address, city: t.city,
        phone: t.phone || '', website: t.website || '',
        description: t.description,
      })
    }
    if (p) setGalleryPhotos(p.map((x: { url: string }) => x.url))
    setLoading(false)
  }, [router])

  useEffect(() => { loadProfile() }, [loadProfile])

  const toggleTherapyType = (type: TherapyType) => {
    setForm((prev) => ({
      ...prev,
      therapy_types: prev.therapy_types.includes(type)
        ? prev.therapy_types.filter((t) => t !== type)
        : [...prev.therapy_types, type],
    }))
  }

  async function uploadProfilePhoto(file: File) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session || !therapist) return
    setUploadingPhoto(true)
    const path = `${session.user.id}/profile`
    const { error } = await supabase.storage.from('therapist-photos').upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from('therapist-photos').getPublicUrl(path)
      const url = data.publicUrl + '?t=' + Date.now()
      await supabase.from('therapists').update({ profile_photo_url: url }).eq('id', therapist.id)
      setTherapist((prev) => prev ? { ...prev, profile_photo_url: url } : prev)
    }
    setUploadingPhoto(false)
  }

  async function uploadGalleryPhoto(file: File) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session || !therapist) return
    setUploadingPhoto(true)
    const path = `${session.user.id}/gallery/${Date.now()}`
    const { error } = await supabase.storage.from('therapist-photos').upload(path, file)
    if (!error) {
      const { data } = supabase.storage.from('therapist-photos').getPublicUrl(path)
      await supabase.from('therapist_photos').insert({ therapist_id: therapist.id, url: data.publicUrl })
      setGalleryPhotos((prev) => [...prev, data.publicUrl])
    }
    setUploadingPhoto(false)
  }

  async function deleteGalleryPhoto(url: string) {
    if (!therapist) return
    await supabase.from('therapist_photos').delete().eq('url', url).eq('therapist_id', therapist.id)
    setGalleryPhotos((prev) => prev.filter((u) => u !== url))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!therapist) return
    setSaving(true); setError(''); setSaved(false)
    const { error } = await supabase.from('therapists').update({
      name: form.name, therapy_types: form.therapy_types,
      address: form.address, city: form.city,
      phone: form.phone || null, website: form.website || null,
      description: form.description,
    }).eq('id', therapist.id)
    if (error) setError('Uložení se nezdařilo.')
    else { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    setSaving(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400">Načítám...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">TERAMAPA</Link>
        <span className="text-gray-400 text-sm">/ Můj profil</span>
        <button onClick={handleLogout} className="ml-auto text-sm text-gray-500 hover:text-gray-700">Odhlásit se</button>
      </header>

      <main className="max-w-xl mx-auto px-4 py-10 space-y-6">

        {/* Stav schválení */}
        {therapist && !therapist.approved && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex gap-3">
            <span>⏳</span>
            <div>
              <p className="text-sm font-medium text-yellow-800">Čeká na schválení</p>
              <p className="text-sm text-yellow-600">Profil zatím není viditelný na mapě.</p>
            </div>
          </div>
        )}
        {therapist?.approved && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex gap-3">
            <span>✓</span>
            <p className="text-sm font-medium text-green-800">Profil je aktivní — jsi viditelný na mapě.</p>
          </div>
        )}

        {/* Profilová fotka */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Profilová fotka</h2>
          <div className="flex items-center gap-4">
            {therapist?.profile_photo_url ? (
              <img src={therapist.profile_photo_url} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-gray-100" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl">👤</div>
            )}
            <div>
              <button
                onClick={() => profilePhotoRef.current?.click()}
                disabled={uploadingPhoto}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {uploadingPhoto ? 'Nahrávám...' : 'Nahrát fotku'}
              </button>
              <p className="text-xs text-gray-400 mt-1">JPG nebo PNG, max 5 MB</p>
            </div>
          </div>
          <input
            ref={profilePhotoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && uploadProfilePhoto(e.target.files[0])}
          />
        </div>

        {/* Formulář profilu */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-5">Základní informace</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jméno a titul *</label>
              <input type="text" required value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Typy terapií *</label>
              <div className="flex flex-wrap gap-2">
                {ALL_THERAPY_TYPES.map((type) => (
                  <button type="button" key={type} onClick={() => toggleTherapyType(type)}
                    className={`px-3 py-1 rounded-full text-sm border-2 font-medium transition-all ${
                      form.therapy_types.includes(type)
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-gray-300 text-gray-600 hover:border-indigo-400'
                    }`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ulice a číslo *</label>
                <input type="text" required value={form.address}
                  onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Město *</label>
                <input type="text" required value={form.city}
                  onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input type="tel" value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Web</label>
              <input type="url" value={form.website}
                onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Popis *</label>
              <textarea required rows={3} value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            {saved && <p className="text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg">✓ Uloženo</p>}
            <button type="submit" disabled={saving || form.therapy_types.length === 0}
              className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors">
              {saving ? 'Ukládám...' : 'Uložit změny'}
            </button>
          </form>
        </div>

        {/* Galerie */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Galerie fotek</h2>
            <button
              onClick={() => galleryPhotoRef.current?.click()}
              disabled={uploadingPhoto}
              className="text-sm text-indigo-600 font-medium hover:underline disabled:opacity-50"
            >
              + Přidat fotku
            </button>
          </div>
          {galleryPhotos.length === 0 ? (
            <p className="text-sm text-gray-400">Zatím žádné fotky. Přidej fotky místa nebo ukázky své práce.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {galleryPhotos.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt="" className="w-full h-24 object-cover rounded-lg" />
                  <button
                    onClick={() => deleteGalleryPhoto(url)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          <input ref={galleryPhotoRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => e.target.files?.[0] && uploadGalleryPhoto(e.target.files[0])} />
        </div>

      </main>
    </div>
  )
}
