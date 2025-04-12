import express from 'express';
import { postQuery, getQueries, getQueryById } from '../controllers/queryController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/', getQueries);          
router.post('/', authenticate, postQuery);
router.get('/:id', getQueryById);

export default router;
