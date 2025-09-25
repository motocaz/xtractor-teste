import type { Document } from '../types'

// Empty state - no documents
export const emptyDocuments: Document[] = []

// Populated state - sample documents
export const sampleDocuments: Document[] = [
    {
        id: 'doc-1',
        name: 'Financial Report Q3 2024.pdf',
        uploadDate: '2024-03-15T10:30:00Z',
        status: 'Ready'
    },
    {
        id: 'doc-2',
        name: 'Employee Handbook 2024.pdf',
        uploadDate: '2024-03-14T14:45:00Z',
        status: 'Processing'
    },
    {
        id: 'doc-3',
        name: 'Contract Agreement - ABC Corp.pdf',
        uploadDate: '2024-03-13T09:15:00Z',
        status: 'Ready'
    },
    {
        id: 'doc-4',
        name: 'Technical Specifications Document.pdf',
        uploadDate: '2024-03-12T16:20:00Z',
        status: 'Error'
    }
]

// Toggle between empty and populated states for demonstration
export const useMockDocuments = (isEmpty: boolean = false): Document[] => {
    return isEmpty ? emptyDocuments : sampleDocuments
}
