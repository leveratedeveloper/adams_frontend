import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';


export function middleware(req) {
  const response = NextResponse.next();
  const sessionIdCookie = req.cookies.get('sessionId');


  if (!sessionIdCookie) {
    const sessionId = uuidv4();
    // const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection?.remoteAddress || req.socket?.remoteAddress || 'Unknown IP';
    let ip = req.headers.get('x-forwarded-for') || req.ip || 'Unknown IP';
    if (ip.includes('::ffff:')) {
      ip = ip.split('::ffff:')[1]; // Extract only the IPv4 part
    }
  
    const userAgent = req.headers.get('user-agent') || 'Unknown User-Agent';

    response.cookies.set('sessionId', sessionId, {
      httpOnly: false,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'development',
      maxAge: 5 * 60, //5 minutes
    });

    response.cookies.set('ipAddress', ip, {
      httpOnly: false, // Set to true if you want to prevent client-side access
      sameSite: 'Lax',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 5 * 60, // 5 minutes
    });

    response.cookies.set('userAgent', userAgent, {
      httpOnly: false,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 5 * 60, // 5 minutes
    });
  }

  return response;
}

export const config = {
  matcher: ['/', '/api/:path*'],
};
