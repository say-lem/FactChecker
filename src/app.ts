import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import queryRoutes from './routes/queryRoutes';
import commentRoutes from './routes/commentRoutes';
import ratingRoutes from './routes/ratingRoutes';

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://fact-checker-frontend-sage.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/comments', commentRoutes);
app.use(ratingRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
