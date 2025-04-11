import mongoose, { Schema, Document } from "mongoose";
import { IQuery } from "../interfaces/queryInterface";

export interface QueryDocument extends IQuery, Document {}

const QuerySchema: Schema = new Schema<QueryDocument>({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  verdictFromApi: [Schema.Types.Mixed], 
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

export default mongoose.model<QueryDocument>("Query", QuerySchema);
