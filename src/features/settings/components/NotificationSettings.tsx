'use client'

import { useState } from 'react'
import SettingsCard from './SettingsCard'
import SettingItem from './SettingItem'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

export default function NotificationSettings() {
    const [emailExtractionComplete, setEmailExtractionComplete] = useState(true)
    const [emailExtractionFailed, setEmailExtractionFailed] = useState(true)
    const [inAppExtractionComplete, setInAppExtractionComplete] = useState(true)

    const handleSaveNotifications = () => {
        // TODO: Implement save notification settings logic
        console.log('Save notification settings:', {
            emailExtractionComplete,
            emailExtractionFailed,
            inAppExtractionComplete
        })
    }

    return (
        <div className="space-y-6">
            <SettingsCard
                title="Email Notifications"
                description="Manage which notifications you receive via email."
            >
                <div className="space-y-4">
                    <SettingItem
                        label="Extraction complete"
                        htmlFor="email-complete"
                        description="Get notified when document extraction finishes successfully"
                    >
                        <Switch
                            id="email-complete"
                            checked={emailExtractionComplete}
                            onCheckedChange={setEmailExtractionComplete}
                        />
                    </SettingItem>
                    <SettingItem
                        label="Extraction failed"
                        htmlFor="email-failed"
                        description="Get notified when document extraction encounters errors"
                    >
                        <Switch
                            id="email-failed"
                            checked={emailExtractionFailed}
                            onCheckedChange={setEmailExtractionFailed}
                        />
                    </SettingItem>
                </div>
            </SettingsCard>

            <SettingsCard
                title="In-App Notifications"
                description="Manage notifications that appear within the application."
            >
                <div className="space-y-4">
                    <SettingItem
                        label="Extraction complete"
                        htmlFor="app-complete"
                        description="Show in-app notifications when extraction completes"
                    >
                        <Switch
                            id="app-complete"
                            checked={inAppExtractionComplete}
                            onCheckedChange={setInAppExtractionComplete}
                        />
                    </SettingItem>
                    <div className="pt-4">
                        <Button onClick={handleSaveNotifications}>Save Changes</Button>
                    </div>
                </div>
            </SettingsCard>
        </div>
    )
}
