'use client'

import { useState } from 'react'
import Image from 'next/image'
import PdfThumbnailGenerator from '@/components/pdf/PdfThumbnailGenerator'
import { Button } from '@/components/ui/button'

/**
 * Example component demonstrating how to use the PdfThumbnailGenerator
 * This is for testing purposes and shows the basic usage pattern
 */
export default function ThumbnailExample() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [thumbnailDataUrl, setThumbnailDataUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file)
            setThumbnailDataUrl(null)
            setError(null)
            setIsGenerating(true)
        }
    }

    const handleThumbnailGenerated = (dataUrl: string) => {
        setThumbnailDataUrl(dataUrl)
        setIsGenerating(false)
    }

    const handleThumbnailError = (error: Error) => {
        setError(error.message)
        setIsGenerating(false)
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">PDF Thumbnail Generator Test</h2>

            {/* File Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                    Select a PDF file:
                </label>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            {/* Status */}
            {isGenerating && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-blue-700">Generating thumbnail...</p>
                </div>
            )}

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-700">Error: {error}</p>
                </div>
            )}

            {/* Generated Thumbnail */}
            {thumbnailDataUrl && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Generated Thumbnail:</h3>
                    <div className="border border-gray-200 rounded p-4 inline-block">
                        <Image
                            src={thumbnailDataUrl}
                            alt="PDF Thumbnail"
                            width={300}
                            height={400}
                            className="max-w-xs max-h-96 object-contain"
                            unoptimized={true}
                        />
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                        <p>Data URL length: {thumbnailDataUrl.length} characters</p>
                        <Button
                            onClick={() => {
                                const link = document.createElement('a')
                                link.href = thumbnailDataUrl
                                link.download = 'thumbnail.jpg'
                                link.click()
                            }}
                            variant="outline"
                            size="sm"
                            className="mt-2"
                        >
                            Download Thumbnail
                        </Button>
                    </div>
                </div>
            )}

            {/* Hidden Thumbnail Generator */}
            {selectedFile && isGenerating && (
                <PdfThumbnailGenerator
                    file={selectedFile}
                    onThumbnailGenerated={handleThumbnailGenerated}
                    onError={handleThumbnailError}
                    width={300}
                    quality={0.8}
                />
            )}

            {/* Usage Instructions */}
            <div className="mt-8 p-4 bg-gray-50 rounded">
                <h3 className="text-lg font-semibold mb-2">How it works:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Select a PDF file using the file input above</li>
                    <li>The PdfThumbnailGenerator component renders the first page</li>
                    <li>When rendering is complete, it extracts the canvas as a data URL</li>
                    <li>The generated thumbnail is displayed above</li>
                    <li>The data URL can be stored in your database or state</li>
                </ol>
            </div>
        </div>
    )
}
