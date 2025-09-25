'use client'

import SettingsLayout from '../../features/settings/components/SettingsLayout'
import ProfileSettings from '../../features/settings/components/ProfileSettings'
import AppearanceSettings from '../../features/settings/components/AppearanceSettings'
import ExtractionSettings from '../../features/settings/components/ExtractionSettings'
import NotificationSettings from '../../features/settings/components/NotificationSettings'
import BillingSettings from '../../features/settings/components/BillingSettings'
import SecuritySettings from '../../features/settings/components/SecuritySettings'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'

export default function SettingsPage() {
    return (
        <SettingsLayout>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
                    <TabsTrigger value="profile" className="text-sm">
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="text-sm">
                        Appearance
                    </TabsTrigger>
                    <TabsTrigger value="extraction" className="text-sm">
                        Extraction
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="text-sm">
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="text-sm">
                        Billing
                    </TabsTrigger>
                    <TabsTrigger value="security" className="text-sm">
                        Security
                    </TabsTrigger>
                </TabsList>

                <div className="w-full">
                    <TabsContent value="profile" className="mt-0">
                        <ProfileSettings />
                    </TabsContent>
                    <TabsContent value="appearance" className="mt-0">
                        <AppearanceSettings />
                    </TabsContent>
                    <TabsContent value="extraction" className="mt-0">
                        <ExtractionSettings />
                    </TabsContent>
                    <TabsContent value="notifications" className="mt-0">
                        <NotificationSettings />
                    </TabsContent>
                    <TabsContent value="billing" className="mt-0">
                        <BillingSettings />
                    </TabsContent>
                    <TabsContent value="security" className="mt-0">
                        <SecuritySettings />
                    </TabsContent>
                </div>
            </Tabs>
        </SettingsLayout>
    )
}