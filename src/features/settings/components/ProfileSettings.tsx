'use client'

import { useState } from 'react'
import SettingsCard from './SettingsCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ProfileSettings() {
    const [fullName, setFullName] = useState('Demo User')
    const email = 'demo@example.com'

    const handlePhotoUpload = () => {
        // Demo mode - photo upload disabled
        console.log('Photo upload not available in demo mode')
    }

    const handleSaveProfile = () => {
        // Demo mode - profile saving disabled
        console.log('Profile saving not available in demo mode')
    }

    return (
        <SettingsCard
            title="Profile"
            description="Manage your public profile and account details."
        >
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="" alt="Profile" />
                        <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <Button onClick={handlePhotoUpload} disabled>Upload new picture</Button>
                        <p className="text-sm text-muted-foreground">
                            Demo mode - photo upload disabled
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={email} disabled />
                </div>

                <div className="pt-4 space-y-2">
                    <div className="flex justify-end">
                        <Button onClick={handleSaveProfile} disabled>
                            Save Changes
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground text-right">
                        Demo mode - changes cannot be saved
                    </p>
                </div>
            </div>
        </SettingsCard>
    )
}
