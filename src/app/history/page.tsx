'use client'

import HistoryPageHeader from '@/features/history/components/HistoryPageHeader'
import HistoryToolbar from '@/features/history/components/HistoryToolbar'
import HistoryTable from '@/features/history/components/HistoryTable'
import HistoryPagination from '@/features/history/components/HistoryPagination'
import { useHistoryFilters } from '@/features/history/hooks/useHistoryFilters'
import { mockExtractionData } from '@/features/history/data/mockData'

export default function ExtractionHistoryPage() {
    const {
        searchTerm,
        filterStatus,
        currentPage,
        itemsPerPage,
        filteredData,
        totalPages,
        handleSearchChange,
        handleStatusFilterChange,
        setCurrentPage,
    } = useHistoryFilters(mockExtractionData)

    return (
        <div className="p-6">
            <div className="container mx-auto max-w-7xl">
                <HistoryPageHeader />

                <HistoryToolbar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    filterStatus={filterStatus}
                    onStatusFilterChange={handleStatusFilterChange}
                />

                <HistoryTable
                    data={filteredData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                />

                <HistoryPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    )
}