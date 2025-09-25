'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthUser extends User {
    user_metadata: {
        full_name?: string
        avatar_url?: string
    }
}

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user as AuthUser || null)
            setLoading(false)
        }

        getInitialSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user as AuthUser || null)
                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    return {
        user,
        loading,
        isAuthenticated: !!user
    }
}
