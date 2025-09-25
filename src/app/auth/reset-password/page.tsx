'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ResetPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            })

            if (error) {
                setError(error.message)
            } else {
                setSuccess(true)
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                        <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <div className="w-6 h-6 bg-success rounded-full"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Check your email</h2>
                        <p className="text-muted-foreground mb-4">
                            We&apos;ve sent you a password reset link. Please check your email and click the link to reset your password.
                        </p>
                        <a
                            href="/auth/signin"
                            className="text-primary hover:text-primary/80 font-medium"
                        >
                            Back to sign in
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-primary-foreground rounded-full"></div>
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
                    Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleResetPassword}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Sending...' : 'Send reset link'}
                            </Button>
                        </div>

                        <div className="text-center">
                            <a
                                href="/auth/signin"
                                className="font-medium text-primary hover:text-primary/80"
                            >
                                Back to sign in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
