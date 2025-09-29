import { useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function useLayoutState() {
    const router = useRouter()
    const pathname = usePathname()
    const [isLeftSidebarMinimized, setIsLeftSidebarMinimized] = useState(false)

    // Sidebar toggle handler
    const handleSidebarToggle = useCallback(() => {
        setIsLeftSidebarMinimized(prev => !prev)
    }, [])

    // Global file selection handler
    const handleFileSelect = useCallback((fileId: string) => {
        router.push(`/files/${fileId}`)
    }, [router])

    // Determine active item based on current route
    const getActiveItem = useCallback(() => {
        if (pathname === '/') return 'dashboard'
        if (pathname === '/history') return 'history'
        if (pathname === '/settings') return 'settings'
        if (pathname?.startsWith('/files/')) return 'files'
        return 'dashboard'
    }, [pathname])

    // Check if we should show sidebar and header (hide on auth pages)
    const shouldShowSidebar = !pathname?.startsWith('/auth')
    const shouldShowHeader = !pathname?.startsWith('/auth')
    const isFileViewerPage = pathname?.startsWith('/files/')

    return {
        isLeftSidebarMinimized,
        handleSidebarToggle,
        handleFileSelect,
        getActiveItem,
        shouldShowSidebar,
        shouldShowHeader,
        isFileViewerPage
    }
}
