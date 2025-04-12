import mongoose, { Schema, Document } from "mongoose";
import { IComment } from "../interfaces/commentInterface";

export interface CommentDocument extends IComment, Document {}

const CommentSchema: Schema = new Schema<CommentDocument>({
  queryId: { type: Schema.Types.ObjectId, ref: "Query", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<CommentDocument>("Comment", CommentSchema);
