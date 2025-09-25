'use client'

import Link from 'next/link'
import clsx from 'clsx'
import type { UploadedFile } from '@/types'
import MainMenu from './MainMenu'
import FileList from './FileList'
import UploadButton from './UploadButton'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface SidebarProps {
    activeItem?: string
    onUploadClick?: () => void
    uploadedFiles?: UploadedFile[]
    selectedFileId?: string | null
    onFileSelect?: (fileId: string) => void
    isMinimized: boolean
}

export default function Sidebar({
    activeItem,
    onUploadClick = () => { },
    uploadedFiles = [],
    selectedFileId,
    onFileSelect = () => { },
    isMinimized,
}: SidebarProps) {
    return (
        <div
            className={clsx(
                'bg-card border-r flex flex-col fixed left-0 top-0 h-screen z-10 transition-all duration-300 ease-in-out overflow-x-hidden',
                {
                    'w-20': isMinimized,
                    'w-64': !isMinimized,
                },
            )}
        >
            {/* Header */}
            <div className="p-4 border-b flex items-center">
                {isMinimized ? (
                    <div className="w-full flex justify-center items-center h-[40px]">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-4 h-4 border-2 border-primary-foreground rounded-full"></div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex items-center h-[40px]">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-4 h-4 border-2 border-primary-foreground rounded-full"></div>
                            </div>
                            <span className="text-xl font-semibold text-foreground whitespace-nowrap">
                                Xtractor
                            </span>
                        </Link>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav
                className={clsx(
                    'flex-1 overflow-y-auto transition-all duration-300 ease-in-out',
                    {
                        'p-2 overflow-x-hidden': isMinimized,
                        'p-4': !isMinimized,
                    },
                )}
            >
                <MainMenu activeItem={activeItem} isMinimized={isMinimized} />
                <div
                    className={clsx('transition-opacity duration-200', {
                        'opacity-0 h-0 invisible': isMinimized,
                        'opacity-100': !isMinimized,
                    })}
                >
                    <FileList
                        uploadedFiles={uploadedFiles}
                        selectedFileId={selectedFileId}
                        onFileSelect={onFileSelect}
                        onUploadClick={onUploadClick}
                    />
                    <div className="mt-8">
                        <Button variant="outline" onClick={onUploadClick} className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Upload a file
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Upload PDF Button */}
            <div className="border-t">
                <UploadButton onClick={onUploadClick} isMinimized={isMinimized} />
            </div>
        </div>
    )
}
