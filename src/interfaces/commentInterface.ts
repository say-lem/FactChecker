import mongoose, { Types } from "mongoose";

export interface IComment {
    queryId: string | Types.ObjectId;
    userId: string | Types.ObjectId;
    comment: string;
    createdAt?: Date;
  }
  