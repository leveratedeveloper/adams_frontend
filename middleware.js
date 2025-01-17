import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export function middleware(req) {
  const { cookies } = req;
  const sessionId = cookies.get('sessionId');

  // If sessionId doesn't exist, create one
  if (!sessionId) {
    const newSessionId = nanoid();
    // Set the sessionId cookie
    const response = NextResponse.next();
    console.log("ini response cookie",response)
    response.cookies.set('sessionId', newSessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      sameSite: 'strict',
      path: '/',
    });

    return response;
  }

  // Continue request if sessionId exists
  return NextResponse.next();
}

export const config = {
  matcher: '/', // Apply middleware to all routes or specific ones
};
