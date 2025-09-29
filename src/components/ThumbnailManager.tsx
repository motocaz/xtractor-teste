'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import PdfThumbnailGenerator to avoid SSR issues
const PdfThumbnailGenerator = dynamic(() => import('./pdf/PdfThumbnailGenerator'), {
    ssr: false
})

interface PendingThumbnail {
    fileId: string
    filePath: string
}

interface ThumbnailManagerProps {
    pendingThumbnails: PendingThumbnail[]
    onThumbnailGenerated: (fileId: string, dataUrl: string) => void
    onThumbnailError?: (fileId: string, error: Error) => void
}

export default function ThumbnailManager({
    pendingThumbnails,
    onThumbnailGenerated,
    onThumbnailError
}: ThumbnailManagerProps) {
    const [currentProcessing, setCurrentProcessing] = useState<PendingThumbnail | null>(null)
    const [queue, setQueue] = useState<PendingThumbnail[]>([])
    const [isClient, setIsClient] = useState(false)

    // Ensure we're on the client side before processing
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Update queue when pendingThumbnails change
    useEffect(() => {
        if (isClient) {
            setQueue(pendingThumbnails)
        }
    }, [pendingThumbnails, isClient])

    // Process next item in queue
    useEffect(() => {
        if (isClient && !currentProcessing && queue.length > 0) {
            const next = queue[0]
            setCurrentProcessing(next)
            setQueue(prev => prev.slice(1))
        }
    }, [isClient, currentProcessing, queue])

    const handleThumbnailGenerated = useCallback((dataUrl: string) => {
        if (currentProcessing) {
            onThumbnailGenerated(currentProcessing.fileId, dataUrl)
            setCurrentProcessing(null)
        }
    }, [currentProcessing, onThumbnailGenerated])

    const handleThumbnailError = useCallback((error: Error) => {
        if (currentProcessing) {
            onThumbnailError?.(currentProcessing.fileId, error)
            setCurrentProcessing(null)
        }
    }, [currentProcessing, onThumbnailError])

    if (!isClient || !currentProcessing) {
        return null
    }

    return (
        <PdfThumbnailGenerator
            file={currentProcessing.filePath}
            onThumbnailGenerated={handleThumbnailGenerated}
            onError={handleThumbnailError}
            width={300}
            quality={0.8}
        />
    )
}
