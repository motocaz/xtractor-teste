'use server'

import { writeFile, readdir, stat } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

export interface ServerFile {
    id: string
    name: string
    uploadDate: string
    size: number
}

// Get the PDF directory path
const getPdfDirectory = () => path.join(process.cwd(), 'src', 'data', 'pdfs')

// Server action to read all files from the directory
export async function getServerFiles(): Promise<ServerFile[]> {
    try {
        const pdfDirectory = getPdfDirectory()
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
                    id: Buffer.from(fileName).toString('base64'), // Create unique ID from filename
                    name: fileName,
                    uploadDate: stats.mtime.toISOString(), // Use modification time
                    size: stats.size
                })
            } catch (error) {
                console.error(`Error reading file stats for ${fileName}:`, error)
            }
        }

        // Sort by upload date (newest first)
        return files.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())

    } catch (error) {
        console.error('Error reading PDF directory:', error)
        return []
    }
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
        const filePath = path.join(getPdfDirectory(), sanitizedFileName)

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

        // Revalidate the page to trigger re-fetch of server files
        revalidatePath('/')

        return { success: true, file: newFile }

    } catch (error) {
        console.error('Error uploading file:', error)
        return { success: false, error: 'Failed to upload file' }
    }
}
