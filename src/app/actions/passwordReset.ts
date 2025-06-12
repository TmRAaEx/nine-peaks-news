'use server';

import { sendPasswordResetEmail } from '../../lib/Emails';
import { generatePasswordResetToken } from '../../lib/Authentication';
import connectDB from '../../lib/ConnectDB';
import User from '@/models/User';

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email')?.toString().trim().toLowerCase();

  if (!email) return;

  await connectDB();

  const user = await User.findOne({ email });
  if (!user) return;

  const token = await generatePasswordResetToken(user._id);
  await sendPasswordResetEmail({ to: email, token, userId: user._id.toString() });

}