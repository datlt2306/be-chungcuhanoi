import { IprojectResponse } from "../../interfaces/project.js";
import Category from "../../models/category.js";



export const getAllCategory = async (req, res) => {
  const {
    _page = 1,
    _sort = "createAt",
    _limit = 10,
    _order = "asc",
  } = req.query;

  const options = {
    page: _page,
    sort: { [_sort as string]: _order === "asc" ? -1 : 1 },
    limit: _limit,
};
  try {
    const category = await Category.paginate({}, options) as any;
    if (category.length === 0) {
      return res.status(404).json({
        message: "Không có danh mục!",
      });
    }
    const response: IprojectResponse = {
      data: category.docs,
      pagination: {
          currentPage: category.page,
          totalPages: category.totalPages,
          totalItems: category.totalDocs,
      },
  };
    return res.status(200).json({
      message: "Lấy tất cả danh mục thành công!",
      response,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id) as any;
    if (!category || category.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }
    return res.status(200).json({
      message: "Lấy 1 danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
