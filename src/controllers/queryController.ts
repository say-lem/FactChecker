import Query from '../models/query';
import { checkFact } from '../services/factCheckServices';
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
    user?: any;
  }

  //post a query if user exists
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

//get all queries
export const getQueries = async (_req: Request, res: Response) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 });
        res.json(queries);
    } catch (error: any) {
        console.error("Error fetching queries:", error);
        res.status(500).json({ error: "Failed to fetch queries" });
    }
};

// get query by ID
export const getQueryById = async (req: Request, res: Response) => {
   
  };

