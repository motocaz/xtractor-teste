'use client'

import { useState } from 'react'
import SettingsCard from './SettingsCard'
import SettingItem from './SettingItem'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

export default function ExtractionSettings() {
    const [uploadBehavior, setUploadBehavior] = useState('auto')
    const [extractTables, setExtractTables] = useState(true)
    const [extractImages, setExtractImages] = useState(true)
    const [extractLinks, setExtractLinks] = useState(false)
    const [ocrEnabled, setOcrEnabled] = useState(true)

    const handleSaveExtraction = () => {
        // TODO: Implement save extraction settings logic
        console.log('Save extraction settings:', {
            uploadBehavior,
            extractTables,
            extractImages,
            extractLinks,
            ocrEnabled
        })
    }

    return (
        <div className="space-y-6">
            <SettingsCard
                title="Default Upload Behavior"
                description="Choose what happens when you upload a new PDF."
            >
                <RadioGroup
                    defaultValue={uploadBehavior}
                    onValueChange={setUploadBehavior}
                    className="flex flex-col space-y-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="auto" id="auto" />
                        <Label htmlFor="auto">Automatically start extraction</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manual" id="manual" />
                        <Label htmlFor="manual">Wait for manual start</Label>
                    </div>
                </RadioGroup>
            </SettingsCard>

            <SettingsCard
                title="Default Extraction Targets"
                description="Select which elements to extract by default."
            >
                <div className="space-y-4">
                    <SettingItem label="Extract Tables" htmlFor="extract-tables">
                        <Switch
                            id="extract-tables"
                            checked={extractTables}
                            onCheckedChange={setExtractTables}
                        />
                    </SettingItem>
                    <SettingItem label="Extract Images" htmlFor="extract-images">
                        <Switch
                            id="extract-images"
                            checked={extractImages}
                            onCheckedChange={setExtractImages}
                        />
                    </SettingItem>
                    <SettingItem label="Extract Links" htmlFor="extract-links">
                        <Switch
                            id="extract-links"
                            checked={extractLinks}
                            onCheckedChange={setExtractLinks}
                        />
                    </SettingItem>
                </div>
            </SettingsCard>

            <SettingsCard
                title="OCR Settings"
                description="Configure optical character recognition for scanned documents."
            >
                <div className="space-y-4">
                    <SettingItem
                        label="Enable OCR for scanned PDFs"
                        htmlFor="ocr-enabled"
                        description="Automatically detect and extract text from scanned documents"
                    >
                        <Switch
                            id="ocr-enabled"
                            checked={ocrEnabled}
                            onCheckedChange={setOcrEnabled}
                        />
                    </SettingItem>
                    <div className="pt-4">
                        <Button onClick={handleSaveExtraction}>Save Changes</Button>
                    </div>
                </div>
            </SettingsCard>
        </div>
    )
}
