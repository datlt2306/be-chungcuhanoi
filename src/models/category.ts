import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
interface ICategory {
    Category_name: string;
    Category_descrition:string;
    Project: mongoose.Types.ObjectId;
}
const categorySchema = new mongoose.Schema<ICategory>({
    Category_name: {
    type: String,
    minLength: 3,
    maxlength: 50,
  },
  Category_descrition:{
    type: String,
    minlength:3,
    maxlength:200
  },
  Project: [
    {
      type: mongoose.Types.ObjectId,
      ref: "project"
    },
  ]
},
  { timestamps: true, versionKey: false });

categorySchema.plugin(mongoosePaginate);
categorySchema.plugin(mongooseDelete, { overrideMethods: 'all',deletedAt : true  });
export default mongoose.model("Category", categorySchema)