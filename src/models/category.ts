import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
import { ICategory } from "../interfaces/category";

const categorySchema = new mongoose.Schema<ICategory>(
  {
    category_name: {
      type: String,
      minLength: 3,
      maxlength: 50,
    },
    category_description: {
      type: String,
      minlength: 3,
      maxlength: 500,
    },
  },
  { timestamps: true, versionKey: false }
);

categorySchema.plugin(mongoosePaginate);
categorySchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});
export default mongoose.model("Category", categorySchema);
