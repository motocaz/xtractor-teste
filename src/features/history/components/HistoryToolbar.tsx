import { Search, CalendarDays } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { HistoryToolbarProps, ExtractionStatus } from '../types'

export default function HistoryToolbar({
    searchTerm,
    onSearchChange,
    filterStatus,
    onStatusFilterChange
}: HistoryToolbarProps) {
    const handleDateFilter = () => {
        // TODO: Implement date filter functionality
        console.log('Date filter clicked')
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search by file name..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-2/3 justify-end">
                <Select
                    value={filterStatus}
                    onValueChange={(value: ExtractionStatus | 'All') =>
                        onStatusFilterChange(value)
                    }
                >
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" className="w-full md:w-auto" onClick={handleDateFilter}>
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Filter by date
                </Button>
            </div>
        </div>
    )
}
