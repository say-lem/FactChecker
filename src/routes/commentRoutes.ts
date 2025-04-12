import express from 'express';
import { postComment, getCommentsByQueryId, deleteComment } from '../controllers/commentController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.post('/', authenticate, postComment);
router.get('/:queryId', getCommentsByQueryId); 
router.delete('/:id', authenticate, deleteComment);

export default router;
