import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase env variables missing')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Test de connexion
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('tasks').select('count').limit(1)
    if (error) {
      console.error('❌ Supabase connection failed:', error.message)
      return false
    }
    console.log('✅ Supabase connected successfully')
    return true
  } catch (err) {
    console.error('❌ Supabase connection error:', err)
    return false
  }
}

// Helper pour auth
export const auth = supabase.auth
