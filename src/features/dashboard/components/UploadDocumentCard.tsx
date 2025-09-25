'use client'

import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface UploadDocumentCardProps {
    onUploadClick: () => void
}

export default function UploadDocumentCard({ onUploadClick }: UploadDocumentCardProps) {
    return (
        <Card
            onClick={onUploadClick}
            className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 cursor-pointer transition-colors bg-muted/20 hover:bg-muted/30"
        >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center min-h-[280px]">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Upload New Document</h3>
                <p className="text-sm text-muted-foreground">
                    Click here to upload your first PDF document
                </p>
            </CardContent>
        </Card>
    )
}
