'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

interface ClientProfile {
  id: string
  full_name: string
  created_at: string
}

export default function MujUcetPage() {
  const router = useRouter()
  const [client, setClient] = useState<ClientProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/prihlaseni')
      return
    }

    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (data) setClient(data as ClientProfile)
    setLoading(false)
  }, [router])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

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
        <span className="text-gray-400 text-sm">/ Můj účet</span>
        <button
          onClick={handleLogout}
          className="ml-auto text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Odhlásit se
        </button>
      </header>

      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Ahoj, {client?.full_name} 👋
        </h1>
        <p className="text-gray-400 mb-8">Vítej ve svém účtu na Teramapě.</p>

        <div className="space-y-4">
          {/* Brzy dostupné */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">💬</span>
              <h2 className="font-semibold text-gray-900">Chat s terapeuty</h2>
              <span className="ml-auto text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">Brzy</span>
            </div>
            <p className="text-sm text-gray-400">Zde budeš moci přímo kontaktovat terapeuty z mapy.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📅</span>
              <h2 className="font-semibold text-gray-900">Rezervace</h2>
              <span className="ml-auto text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">Brzy</span>
            </div>
            <p className="text-sm text-gray-400">Rezervuj termíny přímo přes Teramapu.</p>
          </div>

          {/* Zpět na mapu */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl py-3 font-medium text-sm hover:bg-indigo-700 transition-colors"
          >
            Zpět na mapu →
          </Link>
        </div>
      </main>
    </div>
  )
}
