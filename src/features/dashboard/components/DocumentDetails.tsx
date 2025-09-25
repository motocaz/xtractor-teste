'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Document, DocumentDetailsProps } from '../types'

export default function DocumentDetails({ document, onClose }: DocumentDetailsProps) {
    return (
        <div className="w-80 border-l bg-background flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Document Details</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 space-y-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">File Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-foreground mb-1">File Name</p>
                                <p className="text-sm text-muted-foreground break-words" title={document.name}>
                                    {document.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground mb-1">Upload Date</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(document.uploadDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground mb-1">Status</p>
                                <p className="text-sm text-muted-foreground">
                                    {document.status}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t">
                <Link href={`/files/${document.id}`} className="block">
                    <Button className="w-full" size="lg">
                        View Extracted Data
                    </Button>
                </Link>
            </div>
        </div>
    )
}
