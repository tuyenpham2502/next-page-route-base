// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'

export async function middleware(req: NextRequest) {
  const session = await getSession({ req })

  if (!session) {
    return NextResponse.redirect('/login')
  }

  const userRole = session.user.role // Assuming user role is stored in session

  // Define access control logic
  if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect('/not-authorized')
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/protected/:path*'], // Define routes to apply middleware
}
