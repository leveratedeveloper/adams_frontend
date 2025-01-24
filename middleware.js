import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export function middleware(req) {
  const response = NextResponse.next();
  const sessionIdCookie = req.cookies.get('sessionId');

  // Log cookie status
  console.log('Existing sessionId:', sessionIdCookie);

  if (!sessionIdCookie) {
    const sessionId = nanoid();
    console.log('Generated sessionId:', sessionId); // Debug log

    response.cookies.set('sessionId', sessionId, {
      httpOnly: false,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'development',
      maxAge: 5 * 60, //5 minutes
    });
  }

  return response;
}

export const config = {
  matcher: ['/', '/api/:path*'],
};
