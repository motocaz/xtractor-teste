import { ReactNode } from 'react'
import { Label } from '@/components/ui/label'

interface SettingItemProps {
    label: string
    children: ReactNode
    htmlFor?: string
    description?: string
}

export default function SettingItem({ label, children, htmlFor, description }: SettingItemProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="space-y-0.5">
                <Label htmlFor={htmlFor}>{label}</Label>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>
            {children}
        </div>
    )
}
