// Dashboard-specific types

export interface Document {
    id: string
    name: string
    uploadDate: string
    status: 'Ready' | 'Processing' | 'Error'
    thumbnailDataUrl?: string
}

export interface DocumentCardProps {
    document: Document
    isSelected?: boolean
    onDocumentSelect: (documentId: string) => void
}

export interface DocumentDetailsProps {
    document: Document
    onClose: () => void
}

export interface UploadDocumentCardProps {
    onUploadClick: () => void
}

// Status-related types
export type DocumentStatus = Document['status']
