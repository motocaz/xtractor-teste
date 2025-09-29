'use server'

import { writeFile, readdir, stat, mkdir } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'
import { getStorageDirectory } from '@/lib/storage'

export interface ServerFile {
    id: string
    name: string
    uploadDate: string
    size: number
}

// Get the PDF directory path using the storage utility
const getPdfDirectory = () => {
    try {
        return getStorageDirectory()
    } catch (error) {
        console.error('Error getting PDF directory:', error)
        // Fallback to a safe path
        return path.join(process.cwd(), 'data', 'pdfs')
    }
}

// Internal function to read files from directory
async function readFilesFromDirectory(): Promise<ServerFile[]> {
    try {
        const pdfDirectory = getPdfDirectory()

        // Check if directory exists first (important for build-time)
        try {
            await stat(pdfDirectory)
        } catch (dirError) {
            // Directory doesn't exist yet (normal for build-time or fresh deployments)
            console.log('PDF directory does not exist yet:', pdfDirectory)
            return []
        }

        const fileNames = await readdir(pdfDirectory)

        // Filter for PDF files only
        const pdfFiles = fileNames.filter(name => name.toLowerCase().endsWith('.pdf'))

        // Get file stats and create ServerFile objects
        const files: ServerFile[] = []

        for (const fileName of pdfFiles) {
            try {
                const filePath = path.join(pdfDirectory, fileName)
                const stats = await stat(filePath)

                files.push({
                    id: Buffer.from(fileName).toString('base64'),
                    name: fileName,
                    uploadDate: stats.mtime.toISOString(),
                    size: stats.size
                })
            } catch (error) {
                console.error(`Error reading file stats for ${fileName}:`, error)
            }
        }

        // Sort by upload date (newest first)
        return files.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())

    } catch (error) {
        // Suppress error logging during build time to avoid noise
        if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === 'development') {
            console.error('Error reading PDF directory:', error)
        }
        return []
    }
}

// Server action to read all files from the directory
export async function getServerFiles(): Promise<ServerFile[]> {
    return readFilesFromDirectory()
}

// Server action to upload a file
export async function uploadFileAction(formData: FormData): Promise<{ success: boolean; error?: string; file?: ServerFile }> {
    try {
        const file = formData.get('file') as File | null

        if (!file) {
            return { success: false, error: 'No file provided' }
        }

        if (!file.name.toLowerCase().endsWith('.pdf')) {
            return { success: false, error: 'Only PDF files are allowed' }
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const sanitizedFileName = path.basename(file.name)
        const pdfDirectory = getPdfDirectory()
        const filePath = path.join(pdfDirectory, sanitizedFileName)

        // Ensure directory exists (important for serverless environments)
        try {
            await mkdir(pdfDirectory, { recursive: true })
        } catch (error) {
            // Directory might already exist, that's ok
        }

        // Write file to directory
        await writeFile(filePath, buffer)
        console.log(`Uploaded file saved to: ${filePath}`)

        // Create ServerFile object for the new file
        const newFile: ServerFile = {
            id: Buffer.from(sanitizedFileName).toString('base64'),
            name: sanitizedFileName,
            uploadDate: new Date().toISOString(),
            size: file.size
        }

        // Revalidate the page and clear cache to trigger re-fetch of server files
        revalidatePath('/')
        revalidatePath('/', 'page') // Ensure page cache is invalidated

        return { success: true, file: newFile }

    } catch (error) {
        console.error('Error uploading file:', error)
        return { success: false, error: 'Failed to upload file' }
    }
}
