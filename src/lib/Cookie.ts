import { NextResponse } from 'next/server';

export function setSessionCookie(sessionToken: string, expiresAt: Date) {
  const response = NextResponse.json({ message: 'Session created' });

  response.cookies.set('session_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return response;
}