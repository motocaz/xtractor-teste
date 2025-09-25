'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { UploadedFile } from '@/types'

interface FileContextType {
    uploadedFiles: UploadedFile[]
    setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>
    selectedFileId: string | null
    setSelectedFileId: React.Dispatch<React.SetStateAction<string | null>>
    uploadFile: (file: File) => Promise<void>
    showUploader: boolean
    setShowUploader: React.Dispatch<React.SetStateAction<boolean>>
    isUploading: boolean
    uploadProgress: number
    uploadError: string | null
    uploadSuccess: boolean
    closeUploader: () => void
}

const FileContext = createContext<FileContextType | undefined>(undefined)

interface FileProviderProps {
    children: ReactNode
    initialFiles?: UploadedFile[]
}

export function FileProvider({ children, initialFiles = [] }: FileProviderProps) {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(initialFiles)
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
    const [showUploader, setShowUploader] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const uploadFile = async (file: File) => {
        setIsUploading(true)
        setUploadProgress(0)
        setUploadError(null)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const newFile: UploadedFile = {
                id: Date.now().toString(),
                name: file.name,
                uploadDate: new Date().toISOString()
            }

            setUploadedFiles(prev => [newFile, ...prev])
            setSelectedFileId(newFile.id)
            setUploadSuccess(true)

        } catch (error) {
            setUploadError('Failed to upload file. Please try again.')
            console.error('Upload error:', error)
        } finally {
            setIsUploading(false)
        }
    }

    const closeUploader = () => {
        setShowUploader(false)
        setUploadProgress(0)
        setUploadError(null)
        setUploadSuccess(false)
    }

    const value = {
        uploadedFiles,
        setUploadedFiles,
        selectedFileId,
        setSelectedFileId,
        uploadFile,
        showUploader,
        setShowUploader,
        isUploading,
        uploadProgress,
        uploadError,
        uploadSuccess,
        closeUploader
    }

    return <FileContext.Provider value={value}>{children}</FileContext.Provider>
}

export function useFiles() {
    const context = useContext(FileContext)
    if (context === undefined) {
        throw new Error('useFiles must be used within a FileProvider')
    }
    return context
}
