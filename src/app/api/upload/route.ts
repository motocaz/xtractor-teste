import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { getStorageDirectory } from '@/lib/storage'

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
        return new NextResponse('No file uploaded', { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = file.name
    const sanitizedFileName = path.basename(fileName)
    const storageDir = getStorageDirectory()
    const filePath = path.join(storageDir, sanitizedFileName)

    try {
        // Ensure directory exists
        await mkdir(storageDir, { recursive: true })

        await writeFile(filePath, buffer)
        console.log(`Uploaded file saved to: ${filePath}`)

        return NextResponse.json({
            name: sanitizedFileName,
            size: file.size,
        }, { status: 200 })

    } catch (error) {
        console.error('Error saving file:', error)
        return new NextResponse('Error saving file', { status: 500 })
    }
}
