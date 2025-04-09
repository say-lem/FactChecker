import express from 'express';
import { postQuery, getQueries } from '../controllers/queryController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/', getQueries);          
router.post('/', authenticate, postQuery); 

export default router;
