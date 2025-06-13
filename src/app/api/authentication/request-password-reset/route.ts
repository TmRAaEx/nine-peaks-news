import { NextResponse } from 'next/server';
import { generatePasswordResetToken } from '@/lib/Authentication';
import { sendPasswordResetEmail } from '@/lib/Emails';
import User from '@/models/User';
import connectDB from '@/lib/ConnectDB';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'If an account exists, a reset email will be sent' }, { status: 200 }); // Don’t reveal if user exists
    }

    const token = await generatePasswordResetToken(user._id);
    await sendPasswordResetEmail({
      to: email,
      token,
      userId: user._id.toString(),
    });

    return NextResponse.json({ message: 'Reset email sent' }, { status: 200 });
  } catch (err) {
    console.error('[API] Password Reset Request Error:', err);
    return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 });
  }
}
