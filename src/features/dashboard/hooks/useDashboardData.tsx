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

    // Update documents when server files change
    useEffect(() => {
        setDocuments(prev => {
            const newDocs = serverFiles.map(file => {
                const existing = prev.find(doc => doc.id === file.id)
                if (existing) {
                    return existing // Keep existing document with thumbnail if available
                }
                return transformServerFileToDocument(file)
            })
            return newDocs
        })
    }, [serverFiles])

    const updateDocumentThumbnail = useCallback((fileId: string, thumbnailDataUrl: string) => {
        setDocuments(prev => prev.map(doc =>
            doc.id === fileId
                ? { ...doc, thumbnailDataUrl, thumbnailGenerating: false }
                : doc
        ))
    }, [])

    const markThumbnailError = useCallback((fileId: string) => {
        setDocuments(prev => prev.map(doc =>
            doc.id === fileId
                ? { ...doc, thumbnailGenerating: false }
                : doc
        ))
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
