import express from 'express';
import { submitRating } from '../controllers/ratingController';
import {  authenticate } from '../middlewares/auth'; 

const router = express.Router();

router.post('/api/queries/:id/rate',  authenticate, submitRating);

export default router;
