'use client'

import { useState } from 'react'
import SettingsCard from './SettingsCard'
import { Button } from '@/components/ui/button'

export default function SecuritySettings() {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false)

    const handleEnable2FA = () => {
        // TODO: Implement 2FA setup logic
        console.log('Enable 2FA clicked')
        setIs2FAEnabled(true)
    }

    const handleDisable2FA = () => {
        // TODO: Implement 2FA disable logic
        console.log('Disable 2FA clicked')
        setIs2FAEnabled(false)
    }

    const handleLogoutOtherDevices = () => {
        // TODO: Implement logout from other devices logic
        console.log('Logout from other devices clicked')
    }

    return (
        <div className="space-y-6">
            <SettingsCard
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account by enabling two-factor authentication."
            >
                <div className="space-y-4">
                    {!is2FAEnabled ? (
                        <>
                            <p className="text-sm text-muted-foreground">
                                Two-factor authentication is currently disabled. Enable it to secure your account with an additional verification step.
                            </p>
                            <Button onClick={handleEnable2FA}>Enable 2FA</Button>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <p className="text-sm font-medium text-green-700">
                                    Two-factor authentication is enabled
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Your account is protected with two-factor authentication. You can disable it at any time.
                            </p>
                            <Button variant="outline" onClick={handleDisable2FA}>
                                Disable 2FA
                            </Button>
                        </>
                    )}
                </div>
            </SettingsCard>

            <SettingsCard
                title="Active Sessions"
                description="Manage your active sessions and sign out from other devices."
            >
                <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">Current session</p>
                                <p className="text-sm text-muted-foreground">
                                    Windows • Chrome • Your current session
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Last active: Just now
                                </p>
                            </div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Active
                            </span>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 opacity-60">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">Mobile session</p>
                                <p className="text-sm text-muted-foreground">
                                    iPhone • Safari • 192.168.1.100
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Last active: 2 hours ago
                                </p>
                            </div>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                Inactive
                            </span>
                        </div>
                    </div>

                    <Button variant="destructive" onClick={handleLogoutOtherDevices}>
                        Log out from all other devices
                    </Button>
                </div>
            </SettingsCard>
        </div>
    )
}
