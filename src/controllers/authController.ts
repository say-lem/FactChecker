import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing)  return next(res.status(400).json({ msg: 'User exists' }));

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
  res.status(201).json({ token, user });
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(res.status(400).json({ msg: 'Invalid credentials' }));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(res.status(400).json({ msg: 'Invalid credentials' }));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    // Remove hashed password before sending response
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};