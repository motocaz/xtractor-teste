import { ReactNode } from 'react'

interface SettingsLayoutProps {
    children: ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="p-6 overflow-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account, appearance, and application settings.
                </p>
            </div>
            {children}
        </div>
    )
}
