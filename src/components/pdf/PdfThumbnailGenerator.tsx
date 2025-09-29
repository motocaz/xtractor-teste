'use client'

import { useRef, useCallback, useEffect, useState } from 'react'

interface PdfThumbnailGeneratorProps {
    file: File | string | ArrayBuffer
    onThumbnailGenerated: (dataUrl: string) => void
    onError?: (error: Error) => void
    width?: number
    quality?: number
}

export default function PdfThumbnailGenerator({
    file,
    onThumbnailGenerated,
    onError,
    width = 300,
    quality = 0.8
}: PdfThumbnailGeneratorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isClient, setIsClient] = useState(false)
    const [ReactPDF, setReactPDF] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Load react-pdf dynamically only on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true)
            setIsLoading(true)

            // Dynamically import react-pdf with proper ESM handling
            const loadReactPDF = async () => {
                try {
                    // Use dynamic import with error handling
                    const reactPdfModule = await import('react-pdf').catch(() => {
                        throw new Error('Failed to import react-pdf module')
                    })

                    // Configure worker with fallback
                    if (reactPdfModule.pdfjs?.GlobalWorkerOptions) {
                        reactPdfModule.pdfjs.GlobalWorkerOptions.workerSrc =
                            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
                    }

                    setReactPDF(reactPdfModule)
                    setIsLoading(false)
                } catch (error) {
                    console.error('Failed to load react-pdf:', error)
                    onError?.(new Error('Failed to load PDF library'))
                    setIsLoading(false)
                }
            }

            loadReactPDF()
        }
    }, [onError])

    const handleLoadSuccess = useCallback(() => {
        console.log('PDF loaded successfully, will render page')
    }, [])

    const handleLoadError = useCallback((error: Error) => {
        console.error('PDF load error:', error)
        onError?.(error)
    }, [onError])

    const handleRenderSuccess = useCallback(() => {
        console.log('Page rendered successfully, extracting thumbnail')
        if (canvasRef.current) {
            try {
                const dataUrl = canvasRef.current.toDataURL('image/jpeg', quality)
                console.log('Thumbnail generated, data URL length:', dataUrl.length)
                onThumbnailGenerated(dataUrl)
            } catch (error) {
                console.error('Error generating thumbnail:', error)
                onError?.(error as Error)
            }
        } else {
            console.error('Canvas ref is null when trying to generate thumbnail')
        }
    }, [onThumbnailGenerated, onError, quality])

    const handleRenderError = useCallback((error: Error) => {
        console.error('Page render error:', error)
        onError?.(error)
    }, [onError])

    // Only render on client side and when react-pdf is loaded
    if (!isClient || !ReactPDF || isLoading) {
        return null
    }

    const { Document, Page } = ReactPDF

    console.log('Rendering PdfThumbnailGenerator for file:', file)

    return (
        <div style={{ display: 'none' }} aria-hidden="true">
            <Document
                file={file}
                onLoadSuccess={handleLoadSuccess}
                onLoadError={handleLoadError}
                loading=""
                error=""
                noData=""
            >
                <Page
                    pageNumber={1}
                    width={width}
                    canvasRef={canvasRef}
                    onRenderSuccess={handleRenderSuccess}
                    onRenderError={handleRenderError}
                    loading=""
                    error=""
                    noData=""
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                />
            </Document>
        </div>
    )
}