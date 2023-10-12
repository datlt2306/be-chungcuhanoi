
import Category from "../../models/category.js";
import Project from "../../models/project.js";


export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        await Project.updateMany(
          { categoryId: category._id },
          { categoryId: null }
        );
        return res.status(200).json({
            message: "Xóa danh mục thành công",
            category
        });
    } catch (error) {
        res.status(400).json({
            message: "Xóa sản phẩm thất bại",
            error: error.message,
        });
    }

}
