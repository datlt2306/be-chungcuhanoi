import mongoose from "mongoose";

export interface IRole {
  _id?: string | number;
  role: "admin" | "member";
  users: { type: mongoose.Types.ObjectId; ref: "User" }[];
}
