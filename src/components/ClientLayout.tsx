'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useFiles } from '@/context/FileContext'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import PDFUploader from '@/components/PDFUploader'
import clsx from 'clsx'

interface ClientLayoutProps {
    children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [isLeftSidebarMinimized, setIsLeftSidebarMinimized] = useState(false)

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

    // Global upload handler that works across all pages
    const handleUpload = () => {
        setShowUploader(true)
    }

    // Global file selection handler
    const handleFileSelect = (fileId: string) => {
        setSelectedFileId(fileId)
        router.push(`/files/${fileId}`)
    }

    // Sidebar toggle handler
    const handleSidebarToggle = () => {
        setIsLeftSidebarMinimized(!isLeftSidebarMinimized)
    }

    // Determine active item based on current route
    const getActiveItem = () => {
        if (pathname === '/') return 'dashboard'
        if (pathname === '/history') return 'history'
        if (pathname === '/settings') return 'settings'
        if (pathname?.startsWith('/files/')) return 'files'
        return 'dashboard'
    }

    // Check if we should show sidebar and header (hide on auth pages)
    const shouldShowSidebar = !pathname?.startsWith('/auth')
    const shouldShowHeader = !pathname?.startsWith('/auth')

    // Special handling for file viewer page (has different layout)
    const isFileViewerPage = pathname?.startsWith('/files/')

    if (isFileViewerPage) {
        // File viewer has its own layout with right sidebar
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

    // Standard layout for other pages
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
