import express from 'express';
import { submitRating, updateRating } from '../controllers/ratingController';
import {  authenticate } from '../middlewares/auth'; 

const router = express.Router();

router.post('/api/queries/:id/rate',  authenticate, submitRating);
router.put('/api/queries/:id/rate', authenticate, updateRating);

export default router;
