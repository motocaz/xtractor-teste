import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: any) {
                    request.cookies.set(name, value)
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    supabaseResponse.cookies.set(name, value, options)
                },
                remove(name: string, options: any) {
                    request.cookies.set(name, '')
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    supabaseResponse.cookies.set(name, '', { ...options, maxAge: 0 })
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Define protected routes that require authentication
    const protectedRoutes = [
        '/',
        '/dashboard',
        '/history',
        '/settings',
        '/files'
    ]

    // Check if current path requires authentication
    const requiresAuth = protectedRoutes.some(route =>
        request.nextUrl.pathname === route ||
        request.nextUrl.pathname.startsWith(route + '/')
    )

    // Redirect to signin if user is not authenticated and trying to access protected route
    if (!user && requiresAuth) {
        const url = request.nextUrl.clone()
        url.pathname = '/auth/signin'
        // return NextResponse.redirect(url)
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely.

    return supabaseResponse
}
