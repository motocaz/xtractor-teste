import { Badge } from '@/components/ui/badge'
import type { StatusBadgeProps, ExtractionStatus } from '../types'

export default function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusVariant = (status: ExtractionStatus) => {
        switch (status) {
            case 'Completed':
                return 'default' // Green
            case 'Failed':
                return 'destructive' // Red
            case 'In Progress':
                return 'secondary' // Yellow/gray
            default:
                return 'default'
        }
    }

    return (
        <Badge variant={getStatusVariant(status)}>
            <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
            {status}
        </Badge>
    )
}
