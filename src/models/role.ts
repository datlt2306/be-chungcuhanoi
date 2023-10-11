import mongoose from "mongoose";
import { IRole } from "../interfaces/role";

const roleSchema = new mongoose.Schema<IRole>(
  {
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "admin",
      required: true,
    },
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Role", roleSchema);
