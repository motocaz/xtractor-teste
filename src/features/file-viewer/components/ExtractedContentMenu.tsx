'use client'

import { useState } from 'react'
import clsx from 'clsx'
import {
    Search,
    Table,
    Image,
    Link,
    Paperclip,
    Info,
    FileText,
    ChevronLeft,
    ChevronsRight,
    ChevronsLeft,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const menuItems = [
    { id: 'full-text', label: 'Full-Text Search', icon: Search },
    { id: 'tables', label: 'Tables', icon: Table },
    { id: 'images', label: 'Images', icon: Image },
    { id: 'text-blocks', label: 'Text Blocks', icon: 'T' },
    { id: 'links', label: 'Links', icon: Link },
    { id: 'annotations', label: 'Annotations', icon: FileText },
    { id: 'embedded-files', label: 'Embedded Files', icon: Paperclip },
    { id: 'metadata', label: 'Document Metadata', icon: Info },
]

interface ExtractedContentMenuProps {
    isMinimized: boolean
    onToggle: () => void
}

export default function ExtractedContentMenu({
    isMinimized,
    onToggle,
}: ExtractedContentMenuProps) {
    const [view, setView] = useState('features') // 'features' or 'search'
    const [activeItem, setActiveItem] = useState<string | null>(null)

    const handleSearchClick = () => {
        setView('search')
        setActiveItem('full-text')
    }

    const handleBackClick = () => {
        setView('features')
        setActiveItem(null)
    }

    return (
        <div className="w-full bg-card border-r flex flex-col h-full relative overflow-x-hidden">
            <div
                className={clsx(
                    'transform transition-transform duration-300 ease-out absolute top-0 left-0 w-full h-full',
                    {
                        'translate-x-0': view === 'features',
                        '-translate-x-full': view !== 'features',
                    },
                )}
            >
                <div className="p-4 border-b h-[69px] flex items-center">
                    {isMinimized ? (
                        <div className="w-full flex justify-center">
                            <Button variant="ghost" size="icon" onClick={onToggle}>
                                <ChevronsLeft className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-between">
                            <h1 className="text-xl font-semibold text-foreground">
                                Extracted Content
                            </h1>
                            <Button variant="ghost" size="icon" onClick={onToggle}>
                                <ChevronsRight className="h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <nav className="space-y-1">
                        {menuItems.map(item => {
                            const Icon = item.icon
                            const isActive = activeItem === item.id
                            const isSearchButton = item.id === 'full-text'

                            const content = (
                                <>
                                    {typeof Icon === 'string' ? (
                                        <span className="w-5 h-5 flex items-center justify-center text-lg font-bold flex-shrink-0">
                                            {Icon}
                                        </span>
                                    ) : (
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                    )}
                                    {!isMinimized && (
                                        <span className="min-w-0 break-words">
                                            {item.label}
                                        </span>
                                    )}
                                </>
                            )

                            if (isSearchButton) {
                                return (
                                    <button
                                        key={item.id}
                                        onClick={handleSearchClick}
                                        className={clsx(
                                            'w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left',
                                            {
                                                'text-primary-foreground bg-primary': isActive,
                                                'hover:bg-accent': !isActive,
                                                'justify-center': isMinimized,
                                            },
                                        )}
                                    >
                                        {content}
                                    </button>
                                )
                            }

                            return (
                                <a
                                    key={item.id}
                                    href="#"
                                    className={clsx(
                                        'flex items-center space-x-3 px-3 py-2 rounded-md',
                                        {
                                            'text-primary-foreground bg-primary': isActive,
                                            'hover:bg-accent': !isActive,
                                            'justify-center': isMinimized,
                                        },
                                    )}
                                >
                                    {content}
                                </a>
                            )
                        })}
                    </nav>
                </div>
            </div>

            <div
                className={clsx(
                    'transform transition-transform duration-300 ease-out absolute top-0 left-0 w-full h-full flex flex-col',
                    {
                        'translate-x-0': view === 'search',
                        'translate-x-full': view !== 'search',
                    },
                )}
            >
                <div className="p-4 border-b">
                    <Button
                        variant="ghost"
                        onClick={handleBackClick}
                        className="flex items-center space-x-2 text-sm px-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        {!isMinimized && <span>Back to Features</span>}
                    </Button>
                </div>
                <div className="p-6 flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search within document..."
                            className="w-full pl-10"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
