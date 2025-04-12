import Query from '../models/query';
import { checkFact } from '../services/factCheckServices';
import { Request, Response } from 'express';

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
          $addFields: {
            commentCount: { $size: '$comments' },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $project: {
            comments: 0, 
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

export const getQueryById = async (req: Request, res: Response) => {
   
  };

