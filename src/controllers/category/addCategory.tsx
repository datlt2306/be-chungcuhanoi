
import { categorySchema } from "../../schemas/Category.js";
import Category from "../../models/category.js";

export const addCategory = async (req, res) => {
    try {
      const { category_name } = req.body;
      const formData = req.body;
      const data = await Category.findOne({ category_name });
      if (data) {
        return res.status(400).json({
          message: "Danh mục đã tồn tại",
        });
      }
      const { error } = categorySchema.validate(formData, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
      const category = await Category.create(formData)as any;
      if (!category || category.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy danh mục",
        });
      }
      return res.status(200).json({
        message: "Thêm danh mục thành công",
        category,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  };
  