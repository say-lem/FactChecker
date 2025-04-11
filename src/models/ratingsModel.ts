import mongoose, { Schema, Document } from 'mongoose';

export interface IRating extends Document {
  queryId: string;
  userId: string;
  vote: 'up' | 'down';
  createdAt: Date;
}

const RatingSchema: Schema = new Schema({
  queryId: { type: mongoose.Types.ObjectId, required: true, ref: 'Query' },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  vote: { type: String, enum: ['up', 'down'], required: true },
  createdAt: { type: Date, default: Date.now }
});

RatingSchema.index({ queryId: 1, userId: 1 }, { unique: true });

export default mongoose.model<IRating>('Rating', RatingSchema);
