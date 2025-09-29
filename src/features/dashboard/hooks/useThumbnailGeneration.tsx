import { useMemo, useCallback } from 'react'

interface DocumentWithThumbnail {
    id: string
    name: string
    thumbnailDataUrl?: string
    thumbnailGenerating?: boolean
}

interface PendingThumbnail {
    fileId: string
    filePath: string
}

// Helper function to get file path for thumbnail generation
const getFilePath = (fileId: string, fileName: string) => {
    return `/api/pdf?fileName=${encodeURIComponent(fileName)}`
}

export function useThumbnailGeneration(
    documents: DocumentWithThumbnail[],
    onThumbnailGenerated: (fileId: string, dataUrl: string) => void,
    onThumbnailError: (fileId: string, error: Error) => void
) {
    // Generate thumbnails for documents that don't have them
    const pendingThumbnails = useMemo(() => {
        const pending = documents
            .filter(doc => !doc.thumbnailDataUrl && doc.thumbnailGenerating)
            .map(doc => ({
                fileId: doc.id,
                filePath: getFilePath(doc.id, doc.name)
            }))

        console.log('Pending thumbnails:', pending)
        return pending
    }, [documents])

    const handleThumbnailGenerated = useCallback((fileId: string, dataUrl: string) => {
        console.log('Thumbnail generated for file:', fileId, 'Data URL length:', dataUrl.length)
        onThumbnailGenerated(fileId, dataUrl)
    }, [onThumbnailGenerated])

    const handleThumbnailError = useCallback((fileId: string, error: Error) => {
        console.error(`Thumbnail generation failed for file ${fileId}:`, error)
        onThumbnailError(fileId, error)
    }, [onThumbnailError])

    return {
        pendingThumbnails,
        handleThumbnailGenerated,
        handleThumbnailError
    }
}
