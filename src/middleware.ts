import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // KR Trades discontinued — send any case variant of the old URL home
  if (path.toLowerCase().startsWith('/krtrades')) {
    return NextResponse.redirect(new URL('/', request.url), 301)
  }
}

export const config = {
  matcher: ['/krtrades/:path*', '/Krtrades/:path*', '/KRTRADES/:path*', '/KRtrades/:path*'],
}
