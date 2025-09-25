import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { HistoryActionsMenuProps } from '../types'

export default function HistoryActionsMenu({ record }: HistoryActionsMenuProps) {
    const handleViewDetails = () => {
        // TODO: Implement view details functionality
        console.log('View details for:', record.fileName)
    }

    const handleDownloadReport = () => {
        alert(`Downloading report for ${record.fileName}`)
    }

    const handleRetryExtraction = () => {
        alert(`Retrying extraction for ${record.fileName}`)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleViewDetails}>
                    View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={record.status !== 'Completed'}
                    onClick={handleDownloadReport}
                >
                    Download Report
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={record.status === 'In Progress'}
                    onClick={handleRetryExtraction}
                >
                    Retry Extraction
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
