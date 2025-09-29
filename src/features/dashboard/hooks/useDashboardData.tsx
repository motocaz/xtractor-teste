import { useState, useEffect, useCallback } from 'react'
import { uploadFileAction, type ServerFile } from '@/app/actions/fileActions'
import type { Document } from '../types'

interface DocumentWithThumbnail extends Document {
    thumbnailDataUrl?: string
    thumbnailGenerating?: boolean
}

// Transform ServerFile to Document format with status
const transformServerFileToDocument = (file: ServerFile): DocumentWithThumbnail => ({
    id: file.id,
    name: file.name,
    uploadDate: file.uploadDate,
    status: 'Ready' as const,
    thumbnailGenerating: true
})

export function useDashboardData(initialFiles: ServerFile[]) {
    const [serverFiles, setServerFiles] = useState<ServerFile[]>(initialFiles)
    const [documents, setDocuments] = useState<DocumentWithThumbnail[]>(() =>
        initialFiles.map(transformServerFileToDocument)
    )

    // Update documents when server files change (optimized with Map lookup)
    useEffect(() => {
        setDocuments(prev => {
            // Create a Map for O(1) lookups instead of O(n) Array.find
            const existingMap = new Map(prev.map(doc => [doc.id, doc]))

            const newDocs = serverFiles.map(file => {
                const existing = existingMap.get(file.id)
                return existing || transformServerFileToDocument(file)
            })
            return newDocs
        })
    }, [serverFiles])

    const updateDocumentThumbnail = useCallback((fileId: string, thumbnailDataUrl: string) => {
        setDocuments(prev => {
            const index = prev.findIndex(doc => doc.id === fileId)
            if (index === -1) return prev

            const newDocs = [...prev]
            newDocs[index] = { ...prev[index], thumbnailDataUrl, thumbnailGenerating: false }
            return newDocs
        })
    }, [])

    const markThumbnailError = useCallback((fileId: string) => {
        setDocuments(prev => {
            const index = prev.findIndex(doc => doc.id === fileId)
            if (index === -1) return prev

            const newDocs = [...prev]
            newDocs[index] = { ...prev[index], thumbnailGenerating: false }
            return newDocs
        })
    }, [])

    const addNewFile = useCallback((file: ServerFile) => {
        setServerFiles(prev => [file, ...prev])
        const newDocument = transformServerFileToDocument(file)
        setDocuments(prev => [newDocument, ...prev])
    }, [])

    return {
        documents,
        updateDocumentThumbnail,
        markThumbnailError,
        addNewFile
    }
}
