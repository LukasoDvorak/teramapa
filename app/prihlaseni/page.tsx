'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

const ADMIN_EMAIL = 'lukas.dvo@gmail.com'

export default function PrihlaseniPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Nesprávné přihlašovací údaje.')
      setLoading(false)
      return
    }

    const userId = data.session?.user.id
    const userEmail = data.session?.user.email

    // Admin
    if (userEmail === ADMIN_EMAIL) {
      router.push('/admin')
      return
    }

    // Terapeut?
    const { data: therapistData } = await supabase
      .from('therapists')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (therapistData) {
      router.push('/dashboard')
      return
    }

    // Klient
    router.push('/muj-ucet')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-sm border border-gray-100">
        <Link href="/" className="text-xl font-bold text-indigo-600 block mb-2">
          TERAMAPA
        </Link>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Přihlášení</h1>
        <p className="text-gray-400 text-sm mb-6">Pro terapeuty i klienty</p>

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

          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Přihlašuji...' : 'Přihlásit se'}
          </button>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <p className="text-center text-sm text-gray-400">
              Hledáš terapii?{' '}
              <Link href="/registrace-klienta" className="text-indigo-600 hover:underline">
                Vytvořit účet klienta
              </Link>
            </p>
            <p className="text-center text-sm text-gray-400">
              Jsi terapeut?{' '}
              <Link href="/registrace" className="text-indigo-600 hover:underline">
                Registrovat se na mapu
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
