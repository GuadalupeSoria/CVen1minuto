import { useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export interface CVDraft {
  id: string
  name: string
  language: string
  cv_data: unknown
  created_at: string
  updated_at: string
}

export function useDrafts(userId: string | undefined) {
  const [drafts, setDrafts] = useState<CVDraft[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadDrafts = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('cv_drafts')
      .select('id, name, language, cv_data, created_at, updated_at')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
    if (error) setError(error.message)
    else setDrafts((data as CVDraft[]) ?? [])
    setLoading(false)
  }, [userId])

  const saveDraft = useCallback(async (name: string, cvData: unknown, language: string): Promise<string | null> => {
    if (!userId) return null
    setError(null)
    const { data, error } = await supabase
      .from('cv_drafts')
      .insert({ user_id: userId, name, language, cv_data: cvData })
      .select('id')
      .single()
    if (error) { setError(error.message); return null }
    await loadDrafts()
    return (data as { id: string }).id
  }, [userId, loadDrafts])

  const updateDraft = useCallback(async (id: string, name: string, cvData: unknown, language: string): Promise<boolean> => {
    if (!userId) return false
    setError(null)
    const { error } = await supabase
      .from('cv_drafts')
      .update({ name, language, cv_data: cvData })
      .eq('id', id)
      .eq('user_id', userId)
    if (error) { setError(error.message); return false }
    await loadDrafts()
    return true
  }, [userId, loadDrafts])

  const deleteDraft = useCallback(async (id: string): Promise<boolean> => {
    if (!userId) return false
    const { error } = await supabase
      .from('cv_drafts')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
    if (error) { setError(error.message); return false }
    setDrafts(prev => prev.filter(d => d.id !== id))
    return true
  }, [userId])

  return { drafts, loading, error, loadDrafts, saveDraft, updateDraft, deleteDraft }
}
