import mongoose from "mongoose";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: String;
  roleId: {
    type: mongoose.Types.ObjectId;
    ref: "Role";
  };
}
