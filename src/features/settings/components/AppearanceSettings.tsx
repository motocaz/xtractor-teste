'use client'

import { useState } from 'react'
import SettingsCard from './SettingsCard'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function AppearanceSettings() {
    const [theme, setTheme] = useState('system')
    const [language, setLanguage] = useState('en')

    const handleSaveAppearance = () => {
        // TODO: Implement save appearance logic
        console.log('Save appearance with theme:', theme, 'language:', language)
    }

    return (
        <SettingsCard
            title="Appearance"
            description="Customize the look and feel of the application."
        >
            <div className="space-y-6">
                <div className="space-y-3">
                    <Label>Theme</Label>
                    <RadioGroup
                        defaultValue={theme}
                        onValueChange={setTheme}
                        className="flex flex-col space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="light" id="light" />
                            <Label htmlFor="light">Light</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dark" id="dark" />
                            <Label htmlFor="dark">Dark</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="system" id="system" />
                            <Label htmlFor="system">System</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="pt">Portuguese</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-4">
                    <Button onClick={handleSaveAppearance}>Save Changes</Button>
                </div>
            </div>
        </SettingsCard>
    )
}
