import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Only redirect exact lowercase variants — not the canonical /KRtrades
  if (path.toLowerCase().startsWith('/krtrades') && !path.startsWith('/KRtrades')) {
    const newPath = '/KRtrades' + path.slice('/krtrades'.length)
    return NextResponse.redirect(new URL(newPath, request.url), 301)
  }
}

export const config = {
  matcher: ['/krtrades/:path*', '/Krtrades/:path*', '/KRTRADES/:path*'],
}
