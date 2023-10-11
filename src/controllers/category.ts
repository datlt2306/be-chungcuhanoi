import { categorySchema } from "../schemas/Category.js";
import Category from "../models/category.js";
import { Request,Response } from "express";



export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find()
    if (category.length === 0) {
      return res.status(404).json({
        message: "Không có danh mục!",
      });
    }
    return res.status(200).json({
      message: "Lấy tất cả danh mục thành công!",
      category,
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

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
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

export const addCategory = async (req, res) => {
  try {
    const { Category_name } = req.body;
    const formData = req.body;
    const data = await Category.findOne({ Category_name });
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
