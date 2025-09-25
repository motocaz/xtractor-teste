import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'
import HistoryTableRow from './HistoryTableRow'
import type { HistoryTableProps } from '../types'

export default function HistoryTable({ data, currentPage, itemsPerPage }: HistoryTableProps) {
    // Calculate current page items
    const currentItems = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>FILE NAME</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>DATE</TableHead>
                        <TableHead>DURATION</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.length > 0 ? (
                        currentItems.map((record) => (
                            <HistoryTableRow key={record.id} record={record} />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="h-24 text-center text-muted-foreground"
                            >
                                No extraction records found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
