import { Request, Response, NextFunction } from 'express';
import Rating from '../models/ratingsModel';
import Query from '../models/query';

export const submitRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id: queryId } = req.params;
  const { vote } = req.body;
  const userId = req.user?.id; 

  if (!userId) {
    return next(res.status(401).json({ error: 'Unauthorized' }));
  }

  if (!['up', 'down'].includes(vote)) {
    return next(res.status(400).json({ error: 'Invalid vote value' }));
  }

  try {
    const queryExists = await Query.findById(queryId);
    if (!queryExists) {
      return next(res.status(404).json({ error: 'Query not found' }));
    }

    const alreadyRated = await Rating.findOne({ queryId, userId });
    if (alreadyRated) {
      return next(res.status(409).json({ error: 'You have already rated this query' }));
    }

    await Rating.create({ queryId, userId, vote });

    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (err: any) {
    console.error(err);
    return next(err); 
  }
};

export const updateRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id: queryId } = req.params;
  const { vote } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return next(res.status(401).json({ error: 'Unauthorized' }));
  }

  if (!['up', 'down'].includes(vote)) {
    return next(res.status(400).json({ error: 'Invalid vote value' }));
  }

  try {
    const existingRating = await Rating.findOne({ queryId, userId });

    if (!existingRating) {
      return next(res.status(404).json({ error: 'No existing rating to update' }));
    }

    if (existingRating.vote === vote) {
      return next(res.status(409).json({ error: `You already voted "${vote}"` }));
    }

    existingRating.vote = vote;
    await existingRating.save();

    res.status(200).json({ message: 'Rating updated successfully', updatedVote: vote });
  } catch (err: any) {
    console.error('Error updating rating:', err);
    return next(err);
  }
};
