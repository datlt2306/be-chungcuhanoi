import mongoose from "mongoose";
import { IUser } from "../interfaces/user";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    roleId: {
      type: mongoose.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
