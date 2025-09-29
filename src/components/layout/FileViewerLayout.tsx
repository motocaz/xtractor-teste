'use client'

import clsx from 'clsx'
import { useFiles } from '@/context/FileContext'
import { useLayoutState } from '@/hooks/useLayoutState'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import PDFUploader from '@/components/PDFUploader'

interface FileViewerLayoutProps {
    children: React.ReactNode
}

export default function FileViewerLayout({ children }: FileViewerLayoutProps) {
    const {
        uploadedFiles,
        setSelectedFileId,
        uploadFile,
        showUploader,
        setShowUploader,
        isUploading,
        uploadProgress,
        uploadError,
        uploadSuccess,
        closeUploader
    } = useFiles()

    const {
        isLeftSidebarMinimized,
        handleSidebarToggle,
        handleFileSelect,
        getActiveItem
    } = useLayoutState()

    // Global upload handler that works across all pages
    const handleUpload = () => {
        setShowUploader(true)
    }

    return (
        <div className="flex h-screen bg-background">
            <Sidebar
                activeItem="files"
                onUploadClick={handleUpload}
                uploadedFiles={uploadedFiles}
                onFileSelect={handleFileSelect}
                isMinimized={isLeftSidebarMinimized}
            />

            <div
                className={clsx(
                    'flex-1 flex flex-col transition-all duration-300 ease-in-out',
                    {
                        'ml-20': isLeftSidebarMinimized,
                        'ml-64': !isLeftSidebarMinimized,
                    },
                )}
            >
                <Header onSidebarToggle={handleSidebarToggle} />
                {children}
            </div>

            {showUploader && (
                <PDFUploader
                    onUpload={uploadFile}
                    onClose={closeUploader}
                    isUploading={isUploading}
                    uploadProgress={uploadProgress}
                    uploadError={uploadError || undefined}
                    uploadSuccess={uploadSuccess}
                />
            )}
        </div>
    )
}
