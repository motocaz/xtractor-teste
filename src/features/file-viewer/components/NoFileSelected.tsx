'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NoFileSelectedProps {
    onUploadClick?: () => void
}

export default function NoFileSelected({ onUploadClick }: NoFileSelectedProps) {
    return (
        <div className="flex-1 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <div className="bg-card rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                <div className="text-muted-foreground font-medium mb-4">No PDF Selected</div>
                <p className="mt-1 text-sm text-gray-500">Please select a file to view its contents.</p>
                {onUploadClick && (
                    <div className="mt-6">
                        <Button onClick={onUploadClick}>
                            <Plus className="mr-2 h-4 w-4" />
                            Upload PDF
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
