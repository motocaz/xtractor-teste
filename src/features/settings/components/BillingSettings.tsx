'use client'

import SettingsCard from './SettingsCard'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

interface Invoice {
    id: number
    date: string
    amount: string
    status: string
}

export default function BillingSettings() {
    // Hardcoded billing data
    const currentPlan = 'Pro Plan'
    const usage = 75
    const maxUsage = 100
    const billingHistory: Invoice[] = [
        { id: 1, date: '2024-01-01', amount: '$29.99', status: 'Paid' },
        { id: 2, date: '2023-12-01', amount: '$29.99', status: 'Paid' },
        { id: 3, date: '2023-11-01', amount: '$29.99', status: 'Paid' },
    ]

    const handleManageSubscription = () => {
        // TODO: Implement subscription management logic
        console.log('Manage subscription clicked')
    }

    const handleDownloadInvoice = (invoiceId: number) => {
        // TODO: Implement invoice download logic
        console.log('Download invoice:', invoiceId)
    }

    return (
        <div className="space-y-6">
            <SettingsCard
                title="Current Plan"
                description="Your current subscription and usage details."
            >
                <div className="space-y-4">
                    <div>
                        <p className="text-lg font-semibold">{currentPlan}</p>
                        <p className="text-sm text-muted-foreground">
                            $29.99/month • Billed monthly
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Usage this month</span>
                            <span>{usage}/{maxUsage} documents</span>
                        </div>
                        <Progress value={(usage / maxUsage) * 100} className="w-full" />
                    </div>

                    <Button onClick={handleManageSubscription}>
                        Manage Subscription
                    </Button>
                </div>
            </SettingsCard>

            <SettingsCard
                title="Billing History"
                description="Your recent billing history and invoices."
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {billingHistory.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell>{invoice.amount}</TableCell>
                                <TableCell>
                                    <span className="text-green-600">{invoice.status}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDownloadInvoice(invoice.id)}
                                    >
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SettingsCard>
        </div>
    )
}
