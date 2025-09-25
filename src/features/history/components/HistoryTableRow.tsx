import { TableRow, TableCell } from '@/components/ui/table'
import StatusBadge from './StatusBadge'
import HistoryActionsMenu from './HistoryActionsMenu'
import type { HistoryTableRowProps } from '../types'

export default function HistoryTableRow({ record }: HistoryTableRowProps) {
    return (
        <TableRow>
            <TableCell className="font-medium">
                {record.fileName}
            </TableCell>
            <TableCell>
                <StatusBadge status={record.status} />
            </TableCell>
            <TableCell>{record.date}</TableCell>
            <TableCell>{record.duration}</TableCell>
            <TableCell>
                <HistoryActionsMenu record={record} />
            </TableCell>
        </TableRow>
    )
}
