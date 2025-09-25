'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SearchResultItem {
    id: string
    title: string
    page: number
    content: string
}

const mockResults: SearchResultItem[] = [
    { id: '1', title: 'Financial Highlights', page: 3, content: '... a significant increase in revenue, marking a successful fiscal year. Our financial highlights demonstrate robust growth across all key sectors...' },
    { id: '2', title: 'Market Analysis', page: 7, content: 'The market analysis section provides insights into the competitive landscape and our strategic positioning...' },
    { id: '3', title: 'Future Outlook', page: 12, content: 'Looking ahead, our future outlook remains positive, with planned expansions and innovations set to drive further growth...' },
]

export default function SearchResults() {
    return (
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Search Results</h2>
            <div className="space-y-4">
                {mockResults.map(result => (
                    <Card key={result.id}>
                        <CardHeader>
                            <CardTitle>{result.title}</CardTitle>
                            <CardDescription>Page {result.page}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">{result.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
