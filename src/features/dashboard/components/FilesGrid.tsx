'use client'

import { Plus } from 'lucide-react'
import type { UploadedFile } from '@/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface FilesGridProps {
    files: UploadedFile[]
    onFileSelect: (fileId: string) => void
    onUploadClick: () => void
}

function FileCard({ file, onFileSelect }: { file: UploadedFile, onFileSelect: (fileId: string) => void }) {
    return (
        <Card onClick={() => onFileSelect(file.id)} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
                <div className="relative">
                    <div className="w-full h-48 bg-secondary rounded-lg flex items-center justify-center">
                        <div className="w-32 h-40 bg-background rounded shadow-sm flex items-center justify-center">
                            <div className="w-24 h-32 bg-muted rounded"></div>
                        </div>
                    </div>
                    <span className="absolute top-2 right-2 px-2 py-1 bg-success/20 text-success-foreground text-xs font-medium rounded">Ready</span>
                </div>
            </CardHeader>
            <CardContent>
                <h3 className="font-semibold text-foreground mb-1 truncate" title={file.name}>{file.name}</h3>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground">Uploaded on {new Date(file.uploadDate).toLocaleDateString()}</p>
            </CardFooter>
        </Card>
    )
}

function UploadNewCard({ onClick }: { onClick: () => void }) {
    return (
        <Card onClick={onClick} className="border-2 border-dashed hover:border-primary cursor-pointer flex items-center justify-center">
            <CardContent className="text-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground font-medium">Upload New Document</span>
            </CardContent>
        </Card>
    )
}

export default function FilesGrid({ files, onFileSelect, onUploadClick }: FilesGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map(file => (
                <FileCard key={file.id} file={file} onFileSelect={onFileSelect} />
            ))}
            <UploadNewCard onClick={onUploadClick} />
        </div>
    )
}
