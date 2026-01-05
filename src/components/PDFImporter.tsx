import React, { useState, useRef } from 'react'
import { X, Upload, FileText, Loader2 } from 'lucide-react'

interface PDFImporterProps {
  isOpen: boolean
  onClose: () => void
  onImport: (file: File) => Promise<void>
  language?: string
}

const translations = {
  es: {
    title: 'Importar CV existente',
    subtitle: 'Sube tu CV en PDF y completaremos automáticamente tu información',
    dragText: 'Arrastra tu CV aquí',
    orText: 'o',
    selectButton: 'Seleccionar archivo',
    formatText: 'Formato PDF • Máximo 10MB',
    processing: 'Procesando tu CV...',
    processingSubtext: 'Esto puede tardar unos segundos',
    cancel: 'Cancelar',
    errorInvalidFile: 'Por favor selecciona un archivo PDF válido',
    errorTooLarge: 'El archivo es demasiado grande. Máximo 10MB'
  },
  en: {
    title: 'Import existing CV',
    subtitle: 'Upload your CV in PDF and we will automatically complete your information',
    dragText: 'Drag your CV here',
    orText: 'or',
    selectButton: 'Select file',
    formatText: 'PDF Format • Maximum 10MB',
    processing: 'Processing your CV...',
    processingSubtext: 'This may take a few seconds',
    cancel: 'Cancel',
    errorInvalidFile: 'Please select a valid PDF file',
    errorTooLarge: 'File is too large. Maximum 10MB'
  }
}

const PDFImporter: React.FC<PDFImporterProps> = ({ isOpen, onClose, onImport, language = 'es' }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = translations[language as keyof typeof translations] || translations.es

  if (!isOpen) return null

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      await processFile(files[0])
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await processFile(files[0])
    }
  }

  const processFile = async (file: File) => {
    setError(null)
    
    if (!file.type.includes('pdf')) {
      setError(t.errorInvalidFile)
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError(t.errorTooLarge)
      return
    }

    try {
      setIsProcessing(true)
      await onImport(file)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el PDF')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-all
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400 hover:bg-blue-50'}
            `}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-blue-500" size={48} />
                <p className="text-gray-600 font-medium">{t.processing}</p>
                <p className="text-sm text-gray-500">{t.processingSubtext}</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  {isDragging ? (
                    <Upload className="mx-auto text-blue-500" size={48} />
                  ) : (
                    <FileText className="mx-auto text-gray-400" size={48} />
                  )}
                </div>
                <p className="text-gray-700 font-medium mb-2">
                  {t.dragText}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {t.orText}
                </p>
                <button
                  onClick={handleBrowseClick}
                  disabled={isProcessing}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.selectButton}
                </button>
                <p className="text-xs text-gray-400 mt-4">
                  {t.formatText}
                </p>
              </>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isProcessing}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium disabled:opacity-50"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PDFImporter
