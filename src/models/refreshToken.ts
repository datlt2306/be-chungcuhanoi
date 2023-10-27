import mongoose from "mongoose";
import { IRefreshToken } from "../interfaces/refreshToken ";

const refreshTokenSchema = new mongoose.Schema<IRefreshToken>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const refreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default refreshToken;
