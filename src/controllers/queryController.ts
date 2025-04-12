import Query from '../models/query';
import { checkFact } from '../services/factCheckServices';
import { Request, Response,  NextFunction  } from 'express';
import Comment from '../models/comment';
import Rating from '../models/ratingsModel';

interface AuthenticatedRequest extends Request {
    user?: any;
  }

  export const postQuery = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { text } = req.body;
  
    try {
      const allClaims = await checkFact(text); 
      const newQuery = await Query.create({
        text,
        userId,
        verdictFromApi: allClaims, 
        upvotes: 0,
        downvotes: 0,
      });
      res.status(201).json(newQuery);
    } catch (error: any) {
      console.error("Error creating query:", error);
      res.status(500).json({ error: "Failed to create query" });
    }
  };

  export const getQueries = async (_req: Request, res: Response) => {
    try {
      const queries = await Query.aggregate([
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'queryId',
            as: 'comments',
          },
        },
        {
          $lookup: {
            from: 'ratings',
            localField: '_id',
            foreignField: 'queryId',
            as: 'ratings',
          },
        },
        {
          $addFields: {
            commentCount: { $size: '$comments' },
            upvotes: {
              $size: {
                $filter: {
                  input: '$ratings',
                  as: 'rating',
                  cond: { $eq: ['$$rating.vote', 'up'] },
                },
              },
            },
            downvotes: {
              $size: {
                $filter: {
                  input: '$ratings',
                  as: 'rating',
                  cond: { $eq: ['$$rating.vote', 'down'] },
                },
              },
            },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $project: {
            comments: 0,
            ratings: 0,
          },
        },
      ]);
  
      const queriesWithUser = await Query.populate(queries, {
        path: 'userId',
        select: 'username -_id',
      });
  
      res.json(queriesWithUser);
    } catch (error: any) {
      console.error("Error fetching queries:", error);
      res.status(500).json({ error: "Failed to fetch queries" });
    }
  };
  
  export const getQueryById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    try {
      const query = await Query.findById(id)
        .populate('userId', 'username -_id') 
        .lean(); 
  
      if (!query) {
        return next(res.status(404).json({ message: 'Query not found' }));
      }
  
      const commentCount = await Comment.countDocuments({ queryId: id });
  
      const upvotes = await Rating.countDocuments({ queryId: id, vote: 'up' });
      const downvotes = await Rating.countDocuments({ queryId: id, vote: 'down' });
  
      res.status(200).json({
        ...query,
        upvotes,
        downvotes,
        commentCount,
      });
    } catch (error) {
      console.error("Error fetching query:", error);
      res.status(500).json({ message: 'Failed to fetch query' });
    }
  };
  

