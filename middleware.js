import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function middleware(req) {
  const response = NextResponse.next();
  const sessionIdCookie = req.cookies.get('sessionId');

  // Log cookie status
  console.log('Existing sessionId:', sessionIdCookie);

  if (!sessionIdCookie) {
    const sessionId = uuidv4();
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection?.remoteAddress || req.socket?.remoteAddress || 'Unknown IP';
    const userAgent = req.headers.get('user-agent') || 'Unknown User-Agent';

    console.log('Generated sessionId:', sessionId); // Debug log
    console.log('ip Address', ip)
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
