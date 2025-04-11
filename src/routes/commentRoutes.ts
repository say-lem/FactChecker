import express from 'express';  
import { postComment, getComment, deleteComment } from '../controllers/commentController';

const router = express.Router();


router.post('/', postComment);  
router.get('/', getComment);
router.delete('/', deleteComment)

export default router;