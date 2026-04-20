import React, { useEffect, useState } from 'react'
import { Save, FolderOpen, Trash2, X, Plus, Pencil, Check, Loader2, FileText } from 'lucide-react'
import { useDrafts, type CVDraft } from '../hooks/useDrafts'

interface DraftsPanelProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  currentCVData: unknown
  currentLanguage: string
  onLoad: (cvData: unknown) => void
  language: string
}

const inp = 'w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#3A3A3C] rounded-xl text-white text-sm placeholder:text-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/15 transition-all'

const L = {
  es: {
    title: 'Mis CVs guardados',
    saveAs: 'Guardar CV actual como...',
    namePlaceholder: 'Nombre del CV (ej: CV Frontend ES)',
    save: 'Guardar',
    load: 'Cargar',
    delete: 'Eliminar',
    empty: 'No tenés CVs guardados todavía.',
    emptyHint: 'Guardá el CV actual para empezar.',
    confirmDelete: '¿Eliminar este CV? No se puede deshacer.',
    lastModified: 'Modificado',
    loading: 'Cargando...',
    saving: 'Guardando...',
    saved: '¡Guardado!',
    overwrite: 'Actualizar',
    newDraft: 'Nuevo',
    rename: 'Renombrar',
  },
  en: {
    title: 'My saved CVs',
    saveAs: 'Save current CV as...',
    namePlaceholder: 'CV name (eg: CV Frontend EN)',
    save: 'Save',
    load: 'Load',
    delete: 'Delete',
    empty: 'No saved CVs yet.',
    emptyHint: 'Save the current CV to get started.',
    confirmDelete: 'Delete this CV? This cannot be undone.',
    lastModified: 'Modified',
    loading: 'Loading...',
    saving: 'Saving...',
    saved: 'Saved!',
    overwrite: 'Update',
    newDraft: 'New',
    rename: 'Rename',
  },
}

function formatDate(iso: string, lang: string) {
  const d = new Date(iso)
  return d.toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}

const langBadge: Record<string, string> = {
  es: 'ES',
  en: 'EN',
}

export const DraftsPanel: React.FC<DraftsPanelProps> = ({
  isOpen, onClose, userId, currentCVData, currentLanguage, onLoad, language,
}) => {
  const t = L[language as 'es' | 'en'] ?? L.es
  const { drafts, loading, error, loadDrafts, saveDraft, updateDraft, deleteDraft } = useDrafts(userId)

  const [saveName, setSaveName] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')

  useEffect(() => {
    if (isOpen) loadDrafts()
  }, [isOpen, loadDrafts])

  if (!isOpen) return null

  const handleSave = async () => {
    if (!saveName.trim()) return
    setSaving(true)
    const id = await saveDraft(saveName.trim(), currentCVData, currentLanguage)
    setSaving(false)
    if (id) { setSavedId(id); setSaveName(''); setTimeout(() => setSavedId(null), 2500) }
  }

  const handleOverwrite = async (draft: CVDraft) => {
    setSaving(true)
    await updateDraft(draft.id, draft.name, currentCVData, currentLanguage)
    setSaving(false)
    setSavedId(draft.id); setTimeout(() => setSavedId(null), 2500)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm(t.confirmDelete)) return
    await deleteDraft(id)
  }

  const handleRenameConfirm = async (draft: CVDraft) => {
    if (renameValue.trim() && renameValue !== draft.name) {
      await updateDraft(draft.id, renameValue.trim(), draft.cv_data, draft.language)
    }
    setRenamingId(null)
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#3A3A3C]">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-violet-400" />
            <span className="text-sm font-bold text-white">{t.title}</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white hover:bg-[#2C2C2E] rounded-lg transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Save new */}
        <div className="px-5 py-4 border-b border-[#3A3A3C]">
          <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2">{t.saveAs}</p>
          <div className="flex gap-2">
            <input
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder={t.namePlaceholder}
              className={`${inp} flex-1`}
            />
            <button
              onClick={handleSave}
              disabled={saving || !saveName.trim()}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all shrink-0"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              {saving ? t.saving : t.save}
            </button>
          </div>
          {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
        </div>

        {/* Draft list */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
          {loading && (
            <div className="flex items-center justify-center py-8 text-white/30 gap-2 text-sm">
              <Loader2 size={16} className="animate-spin" />{t.loading}
            </div>
          )}

          {!loading && drafts.length === 0 && (
            <div className="text-center py-8 space-y-1">
              <p className="text-white/40 text-sm">{t.empty}</p>
              <p className="text-white/25 text-xs">{t.emptyHint}</p>
            </div>
          )}

          {drafts.map((draft) => (
            <div
              key={draft.id}
              className={`group relative bg-[#2C2C2E] border rounded-xl p-3.5 transition-all ${
                savedId === draft.id ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-[#3A3A3C] hover:border-[#48484A]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {renamingId === draft.id ? (
                    <div className="flex gap-1.5 mb-1">
                      <input
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleRenameConfirm(draft); if (e.key === 'Escape') setRenamingId(null) }}
                        className="flex-1 px-2 py-1 bg-[#1C1C1E] border border-violet-500 rounded-lg text-white text-sm focus:outline-none"
                        autoFocus
                      />
                      <button onClick={() => handleRenameConfirm(draft)} className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"><Check size={12} /></button>
                      <button onClick={() => setRenamingId(null)} className="p-1.5 bg-[#3A3A3C] text-white/40 rounded-lg hover:bg-[#48484A] transition-colors"><X size={12} /></button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-white truncate">{draft.name}</p>
                      <span className="shrink-0 px-1.5 py-0.5 bg-[#3A3A3C] rounded text-[9px] font-bold text-white/50 uppercase">
                        {langBadge[draft.language] ?? draft.language.toUpperCase()}
                      </span>
                      {savedId === draft.id && (
                        <span className="shrink-0 flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                          <Check size={10} />{t.saved}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-[11px] text-white/30">{t.lastModified} {formatDate(draft.updated_at, language)}</p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => { onLoad(draft.cv_data); onClose() }}
                    title={t.load}
                    className="p-1.5 text-white/40 hover:text-violet-400 hover:bg-violet-400/10 rounded-lg transition-all"
                  >
                    <FolderOpen size={14} />
                  </button>
                  <button
                    onClick={() => handleOverwrite(draft)}
                    title={t.overwrite}
                    className="p-1.5 text-white/40 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all"
                  >
                    <Save size={14} />
                  </button>
                  <button
                    onClick={() => { setRenamingId(draft.id); setRenameValue(draft.name) }}
                    title={t.rename}
                    className="p-1.5 text-white/40 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(draft.id)}
                    title={t.delete}
                    className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DraftsPanel
