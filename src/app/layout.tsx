import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { FileProvider } from '@/context/FileContext'
import ClientLayout from '@/components/ClientLayout'
import { getServerFiles } from './actions/fileActions'
import type { UploadedFile } from '@/types'

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-mono',
})

export const metadata: Metadata = {
    title: 'Xtractor',
    description: 'PDF Data Extraction Tool',
}

// Transform ServerFile to UploadedFile format
const transformServerFilesToUploaded = (serverFiles: Awaited<ReturnType<typeof getServerFiles>>): UploadedFile[] => {
    return serverFiles.map(file => ({
        id: file.id,
        name: file.name,
        uploadDate: file.uploadDate
    }))
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Read server files for the sidebar
    const serverFiles = await getServerFiles()
    const initialFiles = transformServerFilesToUploaded(serverFiles)

    return (
        <html lang="en">
            <body className={`${jetbrainsMono.variable} font-mono`}>
                <FileProvider initialFiles={initialFiles}>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </FileProvider>
            </body>
        </html>
    )
}
