'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import clsx from 'clsx'
import { useFiles } from '@/context/FileContext'
import AdobePDFViewer from '@/features/file-viewer/components/AdobePDFViewer'
import NoFileSelected from '@/features/file-viewer/components/NoFileSelected'
import { Button } from '@/components/ui/button'
import ExtractedContentMenu from '@/features/file-viewer/components/ExtractedContentMenu'

export default function FilePage() {
    const params = useParams()
    const selectedFileId = params.id as string
    const [localFile, setLocalFile] = useState<File | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const [isRightSidebarMinimized, setIsRightSidebarMinimized] = useState(false)

    const { uploadedFiles, setShowUploader } = useFiles()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleUpload = () => {
        setShowUploader(true)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setLocalFile(file)
        }
    }

    const clearLocalFile = () => {
        setLocalFile(null)
    }

    const selectedFile = uploadedFiles.find(file => file.id === selectedFileId)
    const pdfUrl = selectedFile ? `/api/pdf?fileName=${encodeURIComponent(selectedFile.name)}` : null

    if (!isMounted) {
        return null; // or a loading spinner
    }

    const adobeClientId = process.env.NEXT_PUBLIC_ADOBE_CLIENT_ID

    if (!adobeClientId) {
        console.error('Adobe Client ID is not set in environment variables.')
        // Optionally, render an error message to the user
        return <div>Error: Adobe Client ID is not configured.</div>
    }

    return (
        <main className="flex-1 flex flex-col md:flex-row overflow-auto">
            <div className="flex-1 p-6 overflow-auto">
                {!localFile && (!selectedFile || !pdfUrl) && (
                    <div className="mb-4">
                        <input type="file" accept=".pdf" onChange={handleFileChange} />
                    </div>
                )}
                {localFile ? (
                    <div>
                        <AdobePDFViewer
                            clientId={adobeClientId}
                            localFile={localFile}
                            fileName={localFile.name}
                        />
                        <Button onClick={clearLocalFile} className="mt-4">Choose another file</Button>
                    </div>
                ) : selectedFile && pdfUrl ? (
                    <AdobePDFViewer
                        clientId={adobeClientId}
                        fileUrl={pdfUrl}
                        fileName={selectedFile.name}
                    />
                ) : (
                    <NoFileSelected onUploadClick={handleUpload} />
                )}
            </div>
            <aside
                className={clsx(
                    'border-t md:border-t-0 md:border-l overflow-y-auto flex-shrink-0 transition-all duration-300 ease-in-out',
                    {
                        'w-full md:w-20': isRightSidebarMinimized,
                        'w-full md:w-80': !isRightSidebarMinimized,
                    },
                )}
            >
                <ExtractedContentMenu
                    isMinimized={isRightSidebarMinimized}
                    onToggle={() => setIsRightSidebarMinimized(!isRightSidebarMinimized)}
                />
            </aside>
        </main>
    )
}
