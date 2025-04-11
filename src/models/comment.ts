import mongoose, { Schema, Document } from "mongoose";
import { IComment } from "../interfaces/commentInterface";

export interface CommentDocument extends IComment, Document {}

const CommentSchema: Schema = new Schema<CommentDocument>({
    commentId: { type: String, required: true },
    queryId: {type: String, required: true},
    userId:{ type: String, required: true}, 
    comment: { type: String, required: true}, 
    createdAt: {type: Date, default: Date.now},
});

export default mongoose.model<CommentDocument>("Comment", CommentSchema);