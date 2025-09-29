'use client'

import { Button } from '@/components/ui/button'

interface UploadModalProps {
    isOpen: boolean
    onClose: () => void
    onUpload: (file: File) => void
    isUploading: boolean
    uploadError: string | null
    isPending: boolean
}

export default function UploadModal({
    isOpen,
    onClose,
    onUpload,
    isUploading,
    uploadError,
    isPending
}: UploadModalProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-title"
        >
            <div className="bg-white rounded-lg p-6 w-96">
                <h3 id="upload-title" className="text-lg font-semibold mb-4">
                    Upload PDF
                </h3>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const file = formData.get('file') as File
                    if (file) {
                        onUpload(file)
                    }
                }}>
                    <div>
                        <label htmlFor="pdf-upload" className="sr-only">
                            Select PDF file to upload
                        </label>
                        <input
                            id="pdf-upload"
                            type="file"
                            name="file"
                            accept=".pdf"
                            required
                            className="mb-4 w-full"
                            disabled={isUploading}
                            aria-describedby="upload-help"
                        />
                        <div id="upload-help" className="sr-only">
                            Choose a PDF file to upload. Maximum size 50MB.
                        </div>
                    </div>

                    {uploadError && (
                        <div className="text-red-600 text-sm mb-4" role="alert">
                            {uploadError}
                        </div>
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
                            onClick={onClose}
                            disabled={isUploading}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
