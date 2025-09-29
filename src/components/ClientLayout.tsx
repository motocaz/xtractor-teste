'use client'

import { useLayoutState } from '@/hooks/useLayoutState'
import AppLayout from '@/components/layout/AppLayout'
import FileViewerLayout from '@/components/layout/FileViewerLayout'

interface ClientLayoutProps {
    children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const { isFileViewerPage } = useLayoutState()

    if (isFileViewerPage) {
        return <FileViewerLayout>{children}</FileViewerLayout>
    }

    return <AppLayout>{children}</AppLayout>
}
