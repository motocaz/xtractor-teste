'use client'

import { useState } from 'react'
import SettingsCard from './SettingsCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ProfileSettings() {
    const [fullName, setFullName] = useState('John Doe')
    const email = 'john.doe@example.com'

    const handlePhotoUpload = () => {
        // TODO: Implement photo upload logic
        console.log('Upload photo clicked')
    }

    const handleChangePassword = () => {
        // TODO: Implement change password logic
        console.log('Change password clicked')
    }

    const handleSaveProfile = () => {
        // TODO: Implement save profile logic
        console.log('Save profile with name:', fullName)
    }

    return (
        <SettingsCard
            title="Profile"
            description="Manage your public profile and account details."
        >
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <Button onClick={handlePhotoUpload}>Upload new picture</Button>
                        <p className="text-sm text-muted-foreground">
                            JPG, GIF or PNG. 1MB max.
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

                <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handleChangePassword}>
                        Change Password
                    </Button>
                    <Button onClick={handleSaveProfile}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </SettingsCard>
    )
}
