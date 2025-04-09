import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";

export interface UserDocument extends IUser, Document {}

const UserSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<UserDocument>("User", UserSchema);
