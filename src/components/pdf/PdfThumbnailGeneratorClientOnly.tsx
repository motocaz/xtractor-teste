'use client'

import { useRef, useCallback, useEffect, useState } from 'react'

interface PdfThumbnailGeneratorProps {
    file: File | string | ArrayBuffer
    onThumbnailGenerated: (dataUrl: string) => void
    onError?: (error: Error) => void
    width?: number
    quality?: number
}

// Completely client-side only PDF thumbnail generator
export default function PdfThumbnailGeneratorClientOnly({
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

            // Use a completely client-side approach
            const loadReactPDF = async () => {
                try {
                    // Load the PDF.js library directly from CDN
                    const script = document.createElement('script')
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
                    script.async = true

                    script.onload = async () => {
                        try {
                            // Now import react-pdf after PDF.js is loaded
                            const reactPdfModule = await import('react-pdf')

                            // Configure worker
                            if (reactPdfModule.pdfjs?.GlobalWorkerOptions) {
                                reactPdfModule.pdfjs.GlobalWorkerOptions.workerSrc =
                                    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
                            }

                            setReactPDF(reactPdfModule)
                            setIsLoading(false)
                        } catch (error) {
                            console.error('Failed to load react-pdf after PDF.js:', error)
                            onError?.(new Error('Failed to load PDF library'))
                            setIsLoading(false)
                        }
                    }

                    script.onerror = () => {
                        console.error('Failed to load PDF.js from CDN')
                        onError?.(new Error('Failed to load PDF.js library'))
                        setIsLoading(false)
                    }

                    document.head.appendChild(script)
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
