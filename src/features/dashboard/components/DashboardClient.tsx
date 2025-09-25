'use client'

import { useState, useMemo, useTransition } from 'react'
import { ChevronDown, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DocumentCard from './DocumentCard'
import DocumentDetails from './DocumentDetails'
import type { Document } from '../types'
import UploadDocumentCard from './UploadDocumentCard'
import { uploadFileAction, type ServerFile } from '@/app/actions/fileActions'

interface DashboardClientProps {
    initialFiles: ServerFile[]
}

// Transform ServerFile to Document format with status
const transformServerFileToDocument = (file: ServerFile): Document => ({
    id: file.id,
    name: file.name,
    uploadDate: file.uploadDate,
    status: 'Ready' as const // Default status for server files
})

export default function DashboardClient({ initialFiles }: DashboardClientProps) {
    // Initialize state with server files
    const [serverFiles, setServerFiles] = useState<ServerFile[]>(initialFiles)
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)
    const [showUploader, setShowUploader] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    // Transform server files to document format
    const documents = useMemo(() =>
        serverFiles.map(transformServerFileToDocument),
        [serverFiles]
    )

    const handleDocumentSelect = (documentId: string) => {
        // Toggle selection - if same document is clicked, deselect it
        setSelectedDocumentId(selectedDocumentId === documentId ? null : documentId)
    }

    const handleUpload = () => {
        setShowUploader(true)
        setUploadError(null)
    }

    const handleFileUpload = async (file: File) => {
        setIsUploading(true)
        setUploadError(null)

        try {
            const formData = new FormData()
            formData.append('file', file)

            // Use server action for upload
            const result = await uploadFileAction(formData)

            if (result.success && result.file) {
                // Add the new file to the beginning of the list
                setServerFiles(prev => [result.file!, ...prev])
                setShowUploader(false)

                // Trigger page revalidation to ensure sync
                startTransition(() => {
                    // This will cause the page to refresh and fetch updated data
                    window.location.reload()
                })
            } else {
                setUploadError(result.error || 'Upload failed')
            }
        } catch (error) {
            setUploadError('Upload failed. Please try again.')
            console.error('Upload error:', error)
        } finally {
            setIsUploading(false)
        }
    }

    const closeUploader = () => {
        setShowUploader(false)
        setUploadError(null)
    }

    const selectedDocument = documents.find(doc => doc.id === selectedDocumentId)

    return (
        <>
            <div className="flex h-full">
                {/* Main Content Area */}
                <div className="flex-1 p-6">
                    {documents.length === 0 ? (
                        /* Empty State */
                        <div className="flex items-center justify-center h-full">
                            <div className="max-w-md w-full">
                                <UploadDocumentCard onUploadClick={handleUpload} />
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

            {/* Upload Modal/Component */}
            {showUploader && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Upload PDF</h3>

                        <form onSubmit={(e) => {
                            e.preventDefault()
                            const formData = new FormData(e.currentTarget)
                            const file = formData.get('file') as File
                            if (file) {
                                handleFileUpload(file)
                            }
                        }}>
                            <input
                                type="file"
                                name="file"
                                accept=".pdf"
                                required
                                className="mb-4 w-full"
                                disabled={isUploading}
                            />

                            {uploadError && (
                                <div className="text-red-600 text-sm mb-4">{uploadError}</div>
                            )}

                            <div className="flex space-x-2">
                                <Button
                                    type="submit"
                                    disabled={isUploading || isPending}
                                    className="flex-1"
                                >
                                    {isUploading ? 'Uploading...' : 'Upload'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={closeUploader}
                                    disabled={isUploading}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
