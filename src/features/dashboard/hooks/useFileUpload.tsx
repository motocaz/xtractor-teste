import { useState, useTransition, useCallback } from 'react'
import { uploadFileAction, type ServerFile } from '@/app/actions/fileActions'

export function useFileUpload(onFileUploaded: (file: ServerFile) => void) {
    const [showUploader, setShowUploader] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const openUploader = useCallback(() => {
        setShowUploader(true)
        setUploadError(null)
    }, [])

    const closeUploader = useCallback(() => {
        setShowUploader(false)
        setUploadError(null)
    }, [])

    const handleFileUpload = useCallback(async (file: File) => {
        setIsUploading(true)
        setUploadError(null)

        try {
            const formData = new FormData()
            formData.append('file', file)

            // Use server action for upload
            const result = await uploadFileAction(formData)

            if (result.success && result.file) {
                onFileUploaded(result.file)
                setShowUploader(false)

                // Trigger page revalidation to ensure sync
                startTransition(() => {
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
    }, [onFileUploaded])

    return {
        showUploader,
        isUploading,
        uploadError,
        isPending,
        openUploader,
        closeUploader,
        handleFileUpload
    }
}
