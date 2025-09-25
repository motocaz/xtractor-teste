import { getServerFiles } from './actions/fileActions'
import DashboardClient from '@/features/dashboard/components/DashboardClient'

export default async function DashboardPage() {
    // Server-side: Read all files from the directory on initial load
    const initialFiles = await getServerFiles()

    // Pass the initial files to the client component
    return <DashboardClient initialFiles={initialFiles} />
}
