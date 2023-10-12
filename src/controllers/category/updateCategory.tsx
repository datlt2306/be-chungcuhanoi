
import { categorySchema } from "../../schemas/Category.js";
import Category from "../../models/category.js";
export const updateCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const { error } = categorySchema.validate(body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
      const category = await Category.findOneAndUpdate({ _id: id }, body, {
        new: true,
      }) as any;
      
      if (!category || category.length === 0) {
        return res.status(400).json({
          message: "Cập nhật danh mục thất bại",
        });
      }
      return res.status(200).json({
        message: "Cập nhật danh mục thành công",
        category,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
  