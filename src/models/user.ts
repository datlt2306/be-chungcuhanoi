import mongoose from "mongoose";
import { IUser } from "../interfaces/user";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema<IUser>(
  {
    avata: {
      type: String,
      default: "",
    },
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
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "admin",
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.plugin(mongoosePaginate);

export default mongoose.model("User", userSchema);
