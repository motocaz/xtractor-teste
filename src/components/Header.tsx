'use client'

import { Menu } from 'lucide-react'
import UserMenu from './UserMenu'
import { Button } from '@/components/ui/button'

interface HeaderProps {
    onSidebarToggle?: () => void
}

export default function Header({
    onSidebarToggle
}: HeaderProps) {
    return (
        <header className="bg-card border-b px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Sidebar Toggle Button */}
                <div className="flex-shrink-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onSidebarToggle}
                        className="h-8 w-8"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* User Menu */}
                <UserMenu />
            </div>
        </header>
    )
}
