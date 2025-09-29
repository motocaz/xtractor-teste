'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import PdfThumbnailGenerator from '@/components/pdf/PdfThumbnailGenerator'

export default function TestThumbnailPage() {
    const [thumbnailDataUrl, setThumbnailDataUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const testPdfFile = '/api/pdf?fileName=8427473d-dfb4-4db3-8e08-b8d71b2c288e_copy.pdf'

    const handleGenerateThumbnail = () => {
        setIsGenerating(true)
        setThumbnailDataUrl(null)
        setError(null)
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
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">PDF Thumbnail Generation Test</h1>

            <div className="space-y-4">
                <Button onClick={handleGenerateThumbnail} disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate Thumbnail'}
                </Button>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded">
                        <p className="text-red-700">Error: {error}</p>
                    </div>
                )}

                {thumbnailDataUrl && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Generated Thumbnail:</h2>
                        <div className="border border-gray-200 rounded p-4 inline-block">
                            <Image
                                src={thumbnailDataUrl}
                                alt="PDF Thumbnail"
                                width={400}
                                height={600}
                                className="max-w-sm max-h-96 object-contain"
                                unoptimized={true}
                            />
                        </div>
                        <p className="text-sm text-gray-600">
                            Data URL length: {thumbnailDataUrl.length} characters
                        </p>
                    </div>
                )}

                {isGenerating && (
                    <PdfThumbnailGenerator
                        file={testPdfFile}
                        onThumbnailGenerated={handleThumbnailGenerated}
                        onError={handleThumbnailError}
                        width={300}
                        quality={0.8}
                    />
                )}
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded">
                <h3 className="text-lg font-semibold mb-2">Test Instructions:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Click &quot;Generate Thumbnail&quot; to start the process</li>
                    <li>Check the browser console for debug logs</li>
                    <li>The thumbnail should appear above if generation succeeds</li>
                    <li>Any errors will be displayed in the red box</li>
                </ol>
            </div>
        </div>
    )
}
