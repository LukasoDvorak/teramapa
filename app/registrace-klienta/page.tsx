'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function RegistraceKlientaPage() {
  const router = useRouter()
  const [form, setForm] = useState({ full_name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 1. Vytvoření auth účtu
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (authError) {
      setError(authError.message.includes('already registered')
        ? 'Tento email je již registrován. Přihlas se.'
        : 'Chyba: ' + authError.message)
      setLoading(false)
      return
    }

    const userId = authData.user?.id
    if (!userId) {
      setError('Něco se pokazilo. Zkus to znovu.')
      setLoading(false)
      return
    }

    // 2. Uložení profilu klienta
    const { error: dbError } = await supabase.from('clients').insert({
      id: userId,
      full_name: form.full_name,
    })

    if (dbError) {
      setError('Chyba při ukládání profilu: ' + dbError.message)
      setLoading(false)
      return
    }

    router.push('/muj-ucet')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-sm border border-gray-100">
        <Link href="/" className="text-xl font-bold text-indigo-600 block mb-2">TERAMAPA</Link>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Vytvořit účet</h1>
        <p className="text-gray-400 text-sm mb-6">Pro klienty hledající terapii</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jméno</label>
            <input
              type="text"
              required
              placeholder="Jana Nováková"
              value={form.full_name}
              onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heslo</label>
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

          {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Vytvářím účet...' : 'Vytvořit účet'}
          </button>

          <p className="text-center text-sm text-gray-400">
            Už máš účet?{' '}
            <Link href="/prihlaseni" className="text-indigo-600 hover:underline">Přihlas se</Link>
          </p>
          <p className="text-center text-sm text-gray-400">
            Jsi terapeut?{' '}
            <Link href="/registrace" className="text-indigo-600 hover:underline">Registruj se zde</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
