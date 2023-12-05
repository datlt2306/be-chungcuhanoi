import mongoose from "mongoose";

export interface IRefreshToken extends Document {
  _id?: string;
  userId?: mongoose.Schema.Types.ObjectId;
  refreshToken: string;
}
