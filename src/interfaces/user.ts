import mongoose from "mongoose";

export interface IUser extends Document {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: String;
  roleId: {
    type: mongoose.Types.ObjectId;
    ref: "Role";
  };
  status: boolean;
}
