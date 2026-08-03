import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initialize ratelimit only if env variables are present
const ratelimit = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN 
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '10 s'),
      analytics: true,
    }) 
  : undefined;

export async function proxy(request: NextRequest) {
  // Apply rate limiting on auth routes
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    if (ratelimit) {
      try {
        const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
        const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip)
        
        if (!success) {
          return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
            },
          })
        }
      } catch (err) {
        console.error('Rate limiting failed:', err);
      }
    } else {
      console.warn('Upstash Redis env variables missing; skipping rate limiting.');
    }
  }

  // update user's auth session
  return await updateSession(request)
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