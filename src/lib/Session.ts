import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import Session from '@/models/Session';
import connectDB from './ConnectDB';
import Payment from '@/models/Payment';


export async function createSession(userId: string) {
  await connectDB();

  const sessionToken = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 5); // 5 min

  const payments = await Payment.findOne({user_id: "683da71b871ee965b541bf5b"});

  console.log(payments);

  await Session.create({
    user_id: userId,
    tier_id: payments?.tier_id,
    sessionToken,
    expiresAt,
  });

  return { sessionToken, expiresAt };
}

export async function verifySession(req: NextRequest) {
  await connectDB();

  const sessionToken = req.cookies.get('session_token');
  if (!sessionToken) return null;

  const session = await Session.findOne({
    sessionToken,
    expiresAt: { $gt: new Date() },
  });

  return session || null;
}

export async function destroySession(req: NextRequest) {
  await connectDB();

  const sessionToken = req.cookies.get('session_token');
  if (!sessionToken) return NextResponse.json({ message: 'No session' });

  await Session.deleteOne({ sessionToken });

  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.delete('session_token');

  return response;
}