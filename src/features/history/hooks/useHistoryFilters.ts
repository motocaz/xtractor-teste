import { useState, useMemo } from 'react'
import type { ExtractionRecord, ExtractionStatus } from '../types'

export function useHistoryFilters(data: ExtractionRecord[]) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState<ExtractionStatus | 'All'>('All')
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 5

    // Filter data based on search and status
    const filteredData = useMemo(() => {
        return data.filter((record) => {
            const matchesSearch = record.fileName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            const matchesStatus = filterStatus === 'All' || record.status === filterStatus
            return matchesSearch && matchesStatus
        })
    }, [data, searchTerm, filterStatus])

    // Reset to first page when filters change
    const handleSearchChange = (term: string) => {
        setSearchTerm(term)
        setCurrentPage(1)
    }

    const handleStatusFilterChange = (status: ExtractionStatus | 'All') => {
        setFilterStatus(status)
        setCurrentPage(1)
    }

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    return {
        searchTerm,
        filterStatus,
        currentPage,
        itemsPerPage,
        filteredData,
        totalPages,
        handleSearchChange,
        handleStatusFilterChange,
        setCurrentPage,
    }
}
