
import mongoose, { Schema, Document } from "mongoose";
import { IQuery } from "../interfaces/queryInterface";

export interface QueryDocument extends IQuery, Document {}

const QuerySchema: Schema = new Schema<QueryDocument>({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  resultFromAPI: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<QueryDocument>("Query", QuerySchema);
