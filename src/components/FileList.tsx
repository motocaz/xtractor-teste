'use client'

import { FileText } from 'lucide-react'
import type { UploadedFile } from '@/types'
import { formatFileName } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface FileListProps {
    uploadedFiles: UploadedFile[]
    selectedFileId?: string | null
    onFileSelect: (fileId: string) => void
    onUploadClick: () => void
}

export default function FileList({
    uploadedFiles,
    selectedFileId,
    onFileSelect,
    onUploadClick
}: FileListProps) {
    return (
        <div className="mt-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                FILES
            </h3>
            {uploadedFiles.length === 0 ? (
                <div className="text-center py-4">
                    <p className="text-sm text-gray-500 mb-2">No files uploaded yet</p>
                </div>
            ) : (
                <ul className="space-y-1">
                    {uploadedFiles.map((file) => (
                        <li key={file.id}>
                            <Button
                                variant={selectedFileId === file.id ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => onFileSelect(file.id)}
                                className="w-full justify-start"
                                title={file.name}
                            >
                                <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                    {formatFileName(file.name)}
                                </span>
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
