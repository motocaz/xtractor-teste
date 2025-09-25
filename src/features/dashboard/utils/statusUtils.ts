import type { DocumentStatus } from '../types'

export const getStatusColor = (status: DocumentStatus): string => {
    switch (status) {
        case 'Ready':
            return 'bg-green-50 text-green-700 border-green-200'
        case 'Processing':
            return 'bg-yellow-50 text-yellow-700 border-yellow-200'
        case 'Error':
            return 'bg-red-50 text-red-700 border-red-200'
        default:
            return 'bg-gray-50 text-gray-700 border-gray-200'
    }
}

export const getStatusVariant = (status: DocumentStatus): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
        case 'Ready':
            return 'default'
        case 'Processing':
            return 'secondary'
        case 'Error':
            return 'destructive'
        default:
            return 'default'
    }
}

export const getStatusBadgeStyles = (status: DocumentStatus): string => {
    switch (status) {
        case 'Ready':
            return 'bg-green-100 text-green-700 border-green-200'
        case 'Processing':
            return 'bg-yellow-100 text-yellow-700 border-yellow-200'
        case 'Error':
            return 'bg-red-100 text-red-700 border-red-200'
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200'
    }
}
