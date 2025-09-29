'use client'

import Link from 'next/link'
import { LayoutDashboard, Clock, Settings } from 'lucide-react'
import clsx from 'clsx'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface MainMenuProps {
    activeItem?: string
    isMinimized?: boolean
}

const menuItems = [
    {
        href: '/',
        icon: LayoutDashboard,
        label: 'Dashboard',
        id: 'dashboard',
    },
    {
        href: '/history',
        icon: Clock,
        label: 'Extraction History',
        id: 'history',
    },
    {
        href: '/settings',
        icon: Settings,
        label: 'Settings',
        id: 'settings',
    },
]

export default function MainMenu({ activeItem, isMinimized }: MainMenuProps) {
    return (
        <TooltipProvider>
            <ul className="space-y-2">
                {menuItems.map(item => {
                    const Icon = item.icon
                    const isActive = activeItem === item.id

                    const linkContent = (
                        <>
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span
                                className={clsx(
                                    'transition-opacity duration-200 whitespace-nowrap',
                                    {
                                        'opacity-0 w-0': isMinimized,
                                        'opacity-100': !isMinimized,
                                        'font-medium': isActive,
                                    },
                                )}
                            >
                                {item.label}
                            </span>
                        </>
                    )

                    const linkClass = clsx(
                        'flex items-center rounded-lg transition-colors',
                        {
                            'text-primary bg-primary/10': isActive,
                            'hover:bg-accent': !isActive,
                            'justify-center p-3': isMinimized,
                            'space-x-3 p-3': !isMinimized,
                        },
                    )

                    return (
                        <li key={item.id}>
                            {isMinimized ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link href={item.href} className={linkClass}>
                                            {linkContent}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p>{item.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <Link href={item.href} className={linkClass}>
                                    {linkContent}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ul>
        </TooltipProvider>
    )
}
