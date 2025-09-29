'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import clsx from 'clsx'
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'

interface PDFUploaderProps {
    onUpload: (file: File) => void
    onClose: () => void
    isUploading?: boolean
    uploadProgress?: number
    uploadError?: string
    uploadSuccess?: boolean
}

function Dropzone({ onDrop }: { onDrop: (files: File[]) => void }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
        maxSize: 50 * 1024 * 1024, // 50MB limit
    })

    return (
        <div
            {...getRootProps()}
            className={clsx(
                'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                {
                    'border-primary bg-primary/10': isDragActive,
                    'hover:border-primary/50': !isDragActive,
                },
            )}
        >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
                {isDragActive ? 'Drop the PDF file here' : 'Drag & drop a PDF file here'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">or click to select a file</p>
            <p className="text-xs text-muted-foreground/80">Maximum file size: 50MB</p>
        </div>
    )
}

function UploadingState({ progress }: { progress: number }) {
    return (
        <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Upload className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Uploading PDF...</h3>
            <Progress value={progress} className="w-full mb-2" />
            <p className="text-sm text-muted-foreground">{progress}% complete</p>
        </div>
    )
}

function SuccessState({ onClose }: { onClose: () => void }) {
    return (
        <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Upload Successful!</h3>
            <p className="text-muted-foreground mb-4">Your PDF has been uploaded and is ready for extraction.</p>
            <Button onClick={onClose}>Continue</Button>
        </div>
    )
}

function ErrorState({ error, onClose }: { error: string, onClose: () => void }) {
    return (
        <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Upload Failed</h3>
            <p className="text-destructive mb-4">{error}</p>
            <div className="space-x-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        </div>
    )
}


export default function PDFUploader({
    onUpload,
    onClose,
    isUploading = false,
    uploadProgress = 0,
    uploadError,
    uploadSuccess = false
}: PDFUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onUpload(acceptedFiles[0])
        }
    }, [onUpload])

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload PDF File</DialogTitle>
                </DialogHeader>
                {!isUploading && !uploadSuccess && !uploadError && <Dropzone onDrop={onDrop} />}
                {isUploading && <UploadingState progress={uploadProgress} />}
                {uploadSuccess && <SuccessState onClose={onClose} />}
                {uploadError && <ErrorState error={uploadError} onClose={onClose} />}
            </DialogContent>
        </Dialog>
    )
}

