export type ExtractionStatus = 'Completed' | 'Failed' | 'In Progress'

export interface ExtractionRecord {
    id: string
    fileName: string
    status: ExtractionStatus
    date: string
    duration: string
}

export interface HistoryToolbarProps {
    searchTerm: string
    onSearchChange: (term: string) => void
    filterStatus: ExtractionStatus | 'All'
    onStatusFilterChange: (status: ExtractionStatus | 'All') => void
}

export interface HistoryTableProps {
    data: ExtractionRecord[]
    currentPage: number
    itemsPerPage: number
}

export interface HistoryTableRowProps {
    record: ExtractionRecord
}

export interface StatusBadgeProps {
    status: ExtractionStatus
}

export interface HistoryActionsMenuProps {
    record: ExtractionRecord
}
