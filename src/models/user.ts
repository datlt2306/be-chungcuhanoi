import mongoose, { PaginateModel, model } from "mongoose";
import { IUser } from "../interfaces/user";
import mongoosePaginate from "mongoose-paginate-v2";

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
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.plugin(mongoosePaginate);

export default mongoose.model("User", userSchema);
