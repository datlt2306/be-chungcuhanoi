import mongoose from "mongoose";
import { IRole } from "../interfaces/role";
import mongoosePaginate from "mongoose-paginate-v2";

const roleSchema = new mongoose.Schema<IRole>(
  {
    role: {
      type: String,
      enum: ["admin", "member"],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

roleSchema.plugin(mongoosePaginate);

export default mongoose.model("Role", roleSchema);
