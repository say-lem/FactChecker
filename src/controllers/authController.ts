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

export const login = async (req: Request, res: Response,next: NextFunction):Promise<void>  => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(res.status(400).json({ msg: 'Invalid credentials' }));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
  res.json({ token, user });
};