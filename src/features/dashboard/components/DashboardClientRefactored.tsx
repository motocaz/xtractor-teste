'use client'

import { useState, useCallback } from 'react'
import { ChevronDown, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DocumentCard from './DocumentCard'
import DocumentDetails from './DocumentDetails'
import UploadDocumentCard from './UploadDocumentCard'
import UploadModal from './UploadModal'
import dynamic from 'next/dynamic'

// Dynamically import ThumbnailManager to avoid SSR issues
const ThumbnailManager = dynamic(() => import('@/components/ThumbnailManager'), {
    ssr: false
})
import { useDashboardData } from '../hooks/useDashboardData'
import { useThumbnailGeneration } from '../hooks/useThumbnailGeneration'
import { useFileUpload } from '../hooks/useFileUpload'
import type { ServerFile } from '@/app/actions/fileActions'

interface DashboardClientProps {
    initialFiles: ServerFile[]
}

export default function DashboardClientRefactored({ initialFiles }: DashboardClientProps) {
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)

    // Use custom hooks for data management
    const { documents, updateDocumentThumbnail, markThumbnailError, addNewFile } = useDashboardData(initialFiles)

    const { pendingThumbnails, handleThumbnailGenerated, handleThumbnailError } = useThumbnailGeneration(
        documents,
        updateDocumentThumbnail,
        markThumbnailError
    )

    const {
        showUploader,
        isUploading,
        uploadError,
        isPending,
        openUploader,
        closeUploader,
        handleFileUpload
    } = useFileUpload(addNewFile)

    const handleDocumentSelect = useCallback((documentId: string) => {
        setSelectedDocumentId(prev => prev === documentId ? null : documentId)
    }, [])

    const selectedDocument = documents.find(doc => doc.id === selectedDocumentId)

    return (
        <>
            {/* Thumbnail Manager - Hidden component that generates thumbnails */}
            <ThumbnailManager
                pendingThumbnails={pendingThumbnails}
                onThumbnailGenerated={handleThumbnailGenerated}
                onThumbnailError={handleThumbnailError}
            />

            <div className="flex h-full">
                {/* Main Content Area */}
                <div className="flex-1 p-6">
                    {documents.length === 0 ? (
                        /* Empty State */
                        <div className="flex items-center justify-center h-full">
                            <div className="max-w-md w-full">
                                <UploadDocumentCard onUploadClick={openUploader} />
                            </div>
                        </div>
                    ) : (
                        /* Populated State */
                        <>
                            {/* Header */}
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Documents</h1>
                                <p className="text-gray-600">Manage and extract data from your uploaded PDF files.</p>
                            </div>

                            {/* Toolbar */}
                            <div className="flex items-center space-x-4 mb-6">
                                <Button variant="outline" className="flex items-center space-x-2">
                                    <span>Sort by</span>
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" className="flex items-center space-x-2">
                                    <span>Filter</span>
                                    <Filter className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Documents Grid */}
                            <div className="documents-grid-container">
                                {documents.map(document => (
                                    <DocumentCard
                                        key={document.id}
                                        document={document}
                                        isSelected={selectedDocumentId === document.id}
                                        onDocumentSelect={handleDocumentSelect}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Document Details Sidebar */}
                {selectedDocument && (
                    <DocumentDetails
                        document={selectedDocument}
                        onClose={() => setSelectedDocumentId(null)}
                    />
                )}
            </div>

            {/* Upload Modal */}
            <UploadModal
                isOpen={showUploader}
                onClose={closeUploader}
                onUpload={handleFileUpload}
                isUploading={isUploading}
                uploadError={uploadError}
                isPending={isPending}
            />
        </>
    )
}
