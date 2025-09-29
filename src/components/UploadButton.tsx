'use client'

import { Upload } from 'lucide-react'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface UploadButtonProps {
    onClick: () => void
    isMinimized?: boolean
}

export default function UploadButton({ onClick, isMinimized }: UploadButtonProps) {
    const buttonContent = (
        <Button onClick={onClick} className="w-full">
            <Upload className={clsx('h-4 w-4', { 'mr-2': !isMinimized })} />
            {!isMinimized && <span>Upload PDF</span>}
        </Button>
    )

    return (
        <div className="p-4 border-t">
            {isMinimized ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Upload PDF</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                buttonContent
            )}
        </div>
    )
}
