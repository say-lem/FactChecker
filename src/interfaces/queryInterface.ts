import { Types } from "mongoose";

export interface IQuery {
  userId: Types.ObjectId;
  text: string;
  verdictFromApi?: any[];
  createdAt?: Date;
  upvotes?: number;
  downvotes?: number;
}
