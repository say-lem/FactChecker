import { Request , Response } from 'express'; 
import Comment from '../models/comment'


export const postComment = async (req: Request, res: Response): Promise<Response | undefined> => {
    const { queryId, userId, comment } = req.body; // Assuming these are passed in the request body

    if (!userId || !queryId || !comment) {
        return res.status(400).json({ message: 'Text and user are required' });
      }

      const newComment = await Comment.create ({
        comment,
        userId,
        queryId,
        createdAt: new Date(),
      });
    
    //   postComment.push (newComment);
      res.status(201).json(newComment);
    };

//     try {
//         // Here you would typically save the comment to your database
//        const newComment =  await Comment.create({ queryId, userId, comment });

//         res.status(201).json({ message: 'Comment posted successfully' }); // 201 for successful creation
//     } catch (error) {
//         console.error("Error posting comment:", error);
//         res.status(500).json({ error: "Failed to post comment" });
//     }
// }

// export const getComments = async (req: Request, res: Response) => { 
//     const { queryId } = req.query; // Assuming the queryId is passed as a query parameter

//     try {
//         // Here you would typically fetch comments from your database
//         // For example: const comments = await CommentModel.find({ queryId });

//         res.status(200).json({ message: 'Comments fetched successfully' }); // 200 for successful retrieval
//     } catch (error) {
//         console.error("Error fetching comments:", error);
//         res.status(500).json({ error: "Failed to fetch comments" });
//     }
// }

export const getComment = async (req: Request, res: Response)=> {
    res.status(200).json(Comment);
  };


  export const deleteComment = async (req: Request, res: Response): Promise<Response | undefined> => {
    const { id } = req.params;
    try {
      const deletedComment = await Comment.findByIdAndDelete(id);
  
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      res.status(200).json({ message: 'Deleted', comment: deletedComment });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Failed to delete comment" });
    }
  };