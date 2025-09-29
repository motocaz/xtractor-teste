'use client'

import clsx from 'clsx'
import { useFiles } from '@/context/FileContext'
import { useLayoutState } from '@/hooks/useLayoutState'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import PDFUploader from '@/components/PDFUploader'

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
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
        getActiveItem,
        shouldShowSidebar,
        shouldShowHeader
    } = useLayoutState()

    // Global upload handler that works across all pages
    const handleUpload = () => {
        setShowUploader(true)
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {shouldShowSidebar && (
                <Sidebar
                    activeItem={getActiveItem()}
                    onUploadClick={handleUpload}
                    uploadedFiles={uploadedFiles}
                    onFileSelect={handleFileSelect}
                    isMinimized={isLeftSidebarMinimized}
                />
            )}

            <div
                className={clsx(
                    'flex flex-col min-h-screen transition-all duration-300 ease-in-out',
                    {
                        'ml-20': shouldShowSidebar && isLeftSidebarMinimized,
                        'ml-64': shouldShowSidebar && !isLeftSidebarMinimized,
                    },
                )}
            >
                {shouldShowHeader && (
                    <Header onSidebarToggle={handleSidebarToggle} />
                )}

                <main className="flex-1">
                    {children}
                </main>
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
