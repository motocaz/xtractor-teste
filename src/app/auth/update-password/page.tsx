'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function UpdatePassword() {
    const router = useRouter()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    useEffect(() => {
        // Check if user has a valid session (from the reset link)
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                // If no session, redirect to signin
                router.push('/auth/signin')
            }
        }

        checkSession()
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Validation: Check if passwords match
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        // Validation: Check password length
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long')
            setLoading(false)
            return
        }

        try {
            // Update user password
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            })

            if (error) {
                setError(error.message)
            } else {
                setSuccess(true)
                // Redirect to sign-in after 3 seconds
                setTimeout(() => {
                    router.push('/auth/signin')
                }, 3000)
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
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Password updated!</h2>
                        <p className="text-muted-foreground mb-4">
                            Your password has been successfully updated. You will be redirected to the sign-in page shortly.
                        </p>
                        <div className="text-sm text-muted-foreground">
                            Redirecting in 3 seconds...
                        </div>
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
                        <Lock className="w-6 h-6 text-primary-foreground" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
                    Update your password
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    Enter your new password below
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="new-password" className="block text-sm font-medium text-foreground">
                                New Password
                            </Label>
                            <div className="mt-1 relative">
                                <Input
                                    id="new-password"
                                    name="new-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="pr-10"
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="confirm-password" className="block text-sm font-medium text-foreground">
                                Confirm New Password
                            </Label>
                            <div className="mt-1 relative">
                                <Input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pr-10"
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </button>
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
                                {loading ? 'Updating...' : 'Update Password'}
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
