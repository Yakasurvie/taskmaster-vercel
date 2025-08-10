import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { APP_CONFIG } from '@/lib/constants'
import { testConnection } from '@/lib/supabase'

export const HomePage: React.FC = () => {
  const [showHello, setShowHello] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking')

  // Test connexion Supabase au chargement
  useEffect(() => {
    testConnection().then(success => {
      setDbStatus(success ? 'connected' : 'error')
    })
  }, [])

  const handleClick = () => {
    setShowHello(true)
    setClickCount(prev => prev + 1)
    setTimeout(() => setShowHello(false), 3000)
  }

  // Détection environnement
  const detectEnvironment = () => {
    if (window.location.hostname.includes('stackblitz')) return 'StackBlitz Preview'
    if (window.location.hostname.includes('vercel')) return 'Production Vercel'
    if (window.location.hostname === 'localhost') return 'Mac Air M2 Local'
    return 'Preview Environment'
  }

  const environment = detectEnvironment()
  const port = environment.includes('Mac') ? 'localhost:5173' : 
              environment.includes('Vercel') ? 'Global CDN' : 'Preview URL'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {APP_CONFIG.name}
          </h1>
          <p className="text-gray-600 mb-2">
            {APP_CONFIG.description}
          </p>
          <div className="text-sm text-gray-500">
            {APP_CONFIG.version} - {environment}
          </div>
        </div>

        <div className="mb-8">
          <Button
            onClick={handleClick}
            size="lg"
            className="mb-4"
          >
            {environment.includes('Mac') ? 'Hello World Mac ! 🍎' : 
             environment.includes('Vercel') ? 'Hello World Production ! 🌐' :
             'Hello World Preview ! ⚡'}
          </Button>
          
          {showHello && (
            <div className="animate-bounce">
              <div className="text-2xl font-bold text-primary-600 mb-2">
                Hello World ! 🎉
              </div>
              <div className="text-gray-600">
                Stack + Supabase opérationnels ! ✨
              </div>
            </div>
          )}
          
          {clickCount > 0 && !showHello && (
            <div className="text-sm text-gray-500">
              Tests {environment.includes('Mac') ? 'Mac' : 
                    environment.includes('Vercel') ? 'Production' : 'Preview'} : {clickCount}
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Environnement:</span>
              <span className="font-medium">{environment}</span>
            </div>
            <div className="flex justify-between">
              <span>Port:</span>
              <span className="font-medium">{port}</span>
            </div>
            <div className="flex justify-between">
              <span>Supabase:</span>
              <span className={`font-medium ${
                dbStatus === 'connected' ? 'text-green-600' : 
                dbStatus === 'error' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {dbStatus === 'connected' ? '✅ Connecté' :
                 dbStatus === 'error' ? '❌ Erreur' : '🔄 Test...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-600 font-medium">✅ Opérationnel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
