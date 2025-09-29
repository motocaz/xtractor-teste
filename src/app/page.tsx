import { getServerFiles } from './actions/fileActions'
import DashboardClientRefactored from '@/features/dashboard/components/DashboardClientRefactored'

export default async function DashboardPage() {
    // Server-side: Read all files from the directory on initial load
    const initialFiles = await getServerFiles()

    // Pass the initial files to the client component
    return <DashboardClientRefactored initialFiles={initialFiles} />
}
