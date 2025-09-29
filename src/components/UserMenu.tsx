'use client'

import { Bell } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from '@/components/ui/skeleton'

export default function UserMenu() {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center space-x-4">
                <Skeleton className="relative p-2 h-8 w-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
            </div>
        )
    }

    // Since we always have a mock user, we can simplify this
    const userInitial = user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'D'
    const userFullName = user?.user_metadata?.full_name || user?.email || 'Demo User'

    return (
        <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
                <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.user_metadata?.avatar_url || ''} alt={userFullName} />
                            <AvatarFallback>{userInitial}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{userFullName}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>
                        <span className="text-muted-foreground">Demo Mode - No logout needed</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}