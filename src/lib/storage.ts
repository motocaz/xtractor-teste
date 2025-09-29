// Storage utilities that work both locally and in serverless environments
import path from 'path'

export function getStorageDirectory(): string {
    // In production/Vercel, use /tmp directory which is writable
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
        return path.join('/tmp', 'pdfs')
    }

    // In development, use the src/data/pdfs directory
    return path.join(process.cwd(), 'src', 'data', 'pdfs')
}

export function getPublicStorageUrl(filename: string): string {
    // In production, you might want to use a cloud storage service
    // For now, we'll use the same API endpoint
    return `/api/pdf?fileName=${encodeURIComponent(filename)}`
}
