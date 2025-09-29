'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import react-pdf components to avoid SSR issues
const Document = dynamic(
    () => import('react-pdf').then(mod => ({ default: mod.Document })),
    { ssr: false }
)

const Page = dynamic(
    () => import('react-pdf').then(mod => ({ default: mod.Page })),
    { ssr: false }
)

// Proper TypeScript interfaces
interface PdfLibrary {
    Document: React.ComponentType<any>
    Page: React.ComponentType<any>
    pdfjs: any
}

interface PdfThumbnailGeneratorProps {
    file: File | string | ArrayBuffer
    onThumbnailGenerated: (dataUrl: string) => void
    onError?: (error: Error) => void
    width?: number
    quality?: number
}

// Configure PDF.js worker on client side with proper error handling
if (typeof window !== 'undefined') {
    import('react-pdf').then(({ pdfjs }) => {
        // Use a known working worker from a reliable CDN
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
    }).catch((error) => {
        console.error('Failed to configure PDF.js worker:', error)
    })
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
    const [pdfLib, setPdfLib] = useState<PdfLibrary | null>(null)

    // Load react-pdf and configure worker on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true)

            // Dynamically import react-pdf with proper worker configuration
            import('react-pdf').then(({ Document, Page, pdfjs }) => {
                // Configure worker for react-pdf v10+ compatibility
                pdfjs.GlobalWorkerOptions.workerSrc = new URL(
                    'pdfjs-dist/build/pdf.worker.min.mjs',
                    import.meta.url,
                ).toString()

                setPdfLib({ Document, Page, pdfjs })
            }).catch((error) => {
                console.error('Failed to load react-pdf:', error)
                // Try fallback worker configuration
                import('react-pdf').then(({ Document, Page, pdfjs }) => {
                    pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs'
                    setPdfLib({ Document, Page, pdfjs })
                }).catch((fallbackError) => {
                    console.error('Fallback worker also failed:', fallbackError)
                    onError?.(new Error('Failed to load PDF library'))
                })
            })
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
                // Convert canvas to data URL with specified quality
                const dataUrl = canvasRef.current.toDataURL('image/jpeg', quality)
                console.log('Thumbnail generated, data URL length:', dataUrl.length)
                onThumbnailGenerated(dataUrl)
            } catch (error) {
                console.error('Error generating thumbnail:', error)
                onError?.(error as Error)
            }
        } else {
            console.error('Canvas ref is null when trying to generate thumbnail')
            onError?.(new Error('Canvas reference not available'))
        }
    }, [onThumbnailGenerated, onError, quality])

    const handleRenderError = useCallback((error: Error) => {
        console.error('Page render error:', error)
        onError?.(error)
    }, [onError])

    // Only render on client side and when PDF library is loaded
    if (!isClient || !pdfLib) {
        return null
    }

    const { Document, Page } = pdfLib

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
                    // Disable text layer and annotations for thumbnail generation
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                />
            </Document>
        </div>
    )
}
