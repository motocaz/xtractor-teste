import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    const publicRoutes = [
        '/auth/signin',
        '/auth/signup',
        '/auth/reset-password',
        '/auth/update-password',
        '/api'
    ]

    const isPublicRoute = publicRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    )

    if (isPublicRoute) {
        return NextResponse.next()
    }

    return NextResponse.next()
    // return await updateSession(request)
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
