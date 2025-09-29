'use client'

import { useState, useEffect } from 'react'

// Mock user data for development/demo purposes
const mockUser = {
    id: 'demo-user-id',
    email: 'demo@example.com',
    user_metadata: {
        full_name: 'Demo User',
        avatar_url: ''
    }
}

interface AuthUser {
    id: string
    email: string
    user_metadata?: {
        full_name?: string
        avatar_url?: string
    }
}

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate loading and return mock user
        const timer = setTimeout(() => {
            setUser(mockUser)
            setLoading(false)
        }, 100) // Short delay to simulate loading

        return () => clearTimeout(timer)
    }, [])

    return {
        user,
        loading,
        isAuthenticated: true // Always authenticated for demo
    }
}