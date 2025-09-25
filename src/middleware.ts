import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Temporary middleware that allows all requests
// Replace this with Supabase auth middleware once configured
export function middleware(request: NextRequest) {
    // For now, just pass through all requests
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
