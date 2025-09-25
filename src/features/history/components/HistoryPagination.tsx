import clsx from 'clsx'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

interface HistoryPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function HistoryPagination({
    currentPage,
    totalPages,
    onPageChange
}: HistoryPaginationProps) {
    if (totalPages <= 1) {
        return null
    }

    return (
        <Pagination className="mt-6">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (currentPage > 1) {
                                onPageChange(currentPage - 1)
                            }
                        }}
                        className={clsx({
                            'pointer-events-none opacity-50': currentPage === 1,
                        })}
                    />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                onPageChange(index + 1)
                            }}
                            isActive={currentPage === index + 1}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (currentPage < totalPages) {
                                onPageChange(currentPage + 1)
                            }
                        }}
                        className={clsx({
                            'pointer-events-none opacity-50': currentPage === totalPages,
                        })}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
