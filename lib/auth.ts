import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from './db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface JWTPayload {
  userId: string;
  email: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function getAuthUser(req: NextRequest): Promise<{ userId: string; email: string } | null> {
  try {
    const token = req.cookies.get('token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    await connectDB();
    const user = await User.findById(payload.userId).select('_id email');
    
    if (!user) {
      return null;
    }

    return {
      userId: user._id.toString(),
      email: user.email,
    };
  } catch (error) {
    return null;
  }
}

