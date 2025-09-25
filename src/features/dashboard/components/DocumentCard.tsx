'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'
import type { Document, DocumentCardProps } from '../types'
import { getStatusBadgeStyles } from '../utils/statusUtils'

export default function DocumentCard({ document, isSelected, onDocumentSelect }: DocumentCardProps) {
    const handleClick = () => {
        onDocumentSelect(document.id)
    }

    return (
        <div
            onClick={handleClick}
            className={clsx(
                'bg-white rounded-lg cursor-pointer transition-all duration-300',
                // Different styles for selected vs unselected states
                {
                    // Selected state
                    'border-2 border-blue-500 shadow-md': isSelected,
                    // Unselected state with hover effects
                    'border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-500 hover:-translate-y-1': !isSelected,
                }
            )}
        >
            {/* Image Area */}
            <div className="relative bg-stone-50 rounded-t-lg">
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <Badge
                        className={clsx(
                            'text-xs font-medium px-2 py-1 rounded-md border',
                            getStatusBadgeStyles(document.status)
                        )}
                    >
                        {document.status}
                    </Badge>
                </div>
                <div className="h-48 flex items-center justify-center p-4">
                    <Image
                        src="/pdf.png"
                        alt="PDF Document"
                        width={120}
                        height={160}
                        className="object-contain max-h-full rounded-sm"
                        priority
                    />
                </div>
            </div>

            {/* Text Content Area */}
            <div className="p-4 space-y-2">
                {/* File Name */}
                <h3
                    className="font-semibold text-gray-900 text-base leading-tight truncate"
                    title={document.name}
                >
                    {document.name}
                </h3>

                {/* Upload Date */}
                <p className="text-sm text-gray-500">
                    Uploaded on {new Date(document.uploadDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                </p>
            </div>
        </div>
    )
}
