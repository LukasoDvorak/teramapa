'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { Therapist } from '../data/therapists'

export default function AdminPage() {
  const [session, setSession] = useState<unknown>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [therapists, setTherapists] = useState<Therapist[]>([])

  const fetchTherapists = useCallback(async () => {
    const { data } = await supabase
      .from('therapists')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setTherapists(data as Therapist[])
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchTherapists()
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchTherapists()
    })

    return () => subscription.unsubscribe()
  }, [fetchTherapists])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError('Nesprávné přihlašovací údaje.')
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Opravdu smazat "${name}"?`)) return
    await supabase.from('therapists').delete().eq('id', id)
    setTherapists((prev) => prev.filter((t) => t.id !== id))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setSession(null)
  }

  // Přihlašovací formulář
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-sm border border-gray-100">
          <Link href="/" className="text-xl font-bold text-indigo-600 block mb-6">
            TERAMAPA
          </Link>
          <h1 className="text-xl font-bold text-gray-900 mb-6">Admin přihlášení</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heslo</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-medium text-sm hover:bg-indigo-700 transition-colors"
            >
              Přihlásit se
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          TERAMAPA
        </Link>
        <span className="text-gray-400 text-sm">/ Admin</span>
        <button
          onClick={handleLogout}
          className="ml-auto text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Odhlásit se
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            Terapeuti <span className="text-gray-400 font-normal">({therapists.length})</span>
          </h1>
          <Link
            href="/registrace"
            className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            + Přidat terapeuta
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Jméno</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Město</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Terapie</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Přidáno</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Kontakt</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {therapists.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{t.name}</td>
                  <td className="px-4 py-3 text-gray-600">{t.city}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {t.therapy_types.map((type) => (
                        <span
                          key={type}
                          className="bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {t.created_at
                      ? new Date(t.created_at).toLocaleDateString('cs-CZ')
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {t.phone && <div>{t.phone}</div>}
                    {t.website && (
                      <a
                        href={t.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:underline"
                      >
                        Web
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(t.id, t.name)}
                      className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors"
                    >
                      Smazat
                    </button>
                  </td>
                </tr>
              ))}
              {therapists.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    Žádní terapeuti v databázi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
