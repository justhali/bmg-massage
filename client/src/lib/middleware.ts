import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const publicUrls = ['/', '/login', '/register', '/massages']
    const isPublicUrl = publicUrls.includes(request.nextUrl.pathname)

    if (!token && !isPublicUrl) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && ['/login', '/register'].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ['/massages/:id']
}