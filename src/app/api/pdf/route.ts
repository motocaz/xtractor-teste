import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const fileName = searchParams.get('fileName')

    if (!fileName) {
        return new NextResponse('File name is required', { status: 400 })
    }

    // Sanitize the file name to prevent directory traversal
    const sanitizedFileName = path.basename(fileName)
    const filePath = path.join(process.cwd(), 'src', 'data', 'pdfs', sanitizedFileName)

    try {
        if (fs.existsSync(filePath)) {
            const fileBuffer = fs.readFileSync(filePath)
            const headers = new Headers()
            headers.set('Content-Type', 'application/pdf')
            return new Response(fileBuffer, { status: 200, headers })
        } else {
            return new NextResponse('File not found', { status: 404 })
        }
    } catch (error) {
        console.error('Error reading file:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
