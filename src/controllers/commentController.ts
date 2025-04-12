import { Request, Response,  NextFunction } from 'express';
import Comment from '../models/comment';

interface AuthenticatedRequest extends Request {
  user?: { id: string; name: string }; 
}

export const postComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { queryId, comment } = req.body;
  const userId = req.user?.id; 

  if (!userId || !queryId || !comment) {
    return next(res.status(400).json({ message: 'All fields are required' }));
  }

  try {
    const newComment = await Comment.create({
      comment,
      userId,
      queryId,
      createdAt: new Date(),
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to post comment" });
  }
};

export const getCommentsByQueryId = async (req: Request, res: Response,  next: NextFunction) => {
  const { queryId } = req.params;

  try {
    const comments = await Comment.find({ queryId }).populate('userId', 'username -_id'); 
    return next(res.status(200).json(comments));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return next(res.status(500).json({ error: "Failed to fetch comments" }));
  }
};

export const deleteComment = async (req: Request, res: Response,  next: NextFunction) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return next(res.status(404).json({ message: 'Comment not found' }));
    }

    return next(res.status(200).json({ message: 'Deleted', comment: deletedComment }));
  } catch (error) {
    console.error("Error deleting comment:", error);
    return next(res.status(500).json({ error: "Failed to delete comment" }));
  }
};
