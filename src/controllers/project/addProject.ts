import { Request, Response } from "express";
import Project from "../../models/project";
import User from "../../models/user";
import Category from "../../models/category";
import { projectSchema } from "../../schemas/project";

export const createProject = async (req: Request, res: Response) => {
    const formData = req.body;
    const { project_name, categoryId, userId } = req.body;
    try {

        if (!userId) {
            return res.status(400).json({
                message: "Bạn chưa đăng nhập",
            });
        }
        const checkName = await Project.findOne({ project_name });
        if (checkName) {
            return res.status(400).json({
                message: "Tên dự án đã tồn tại",
            });
        }

        const existCategory = await Category.findOne({ categoryId });
        if (!existCategory) {
            return res.status(400).json({
                message: "Danh mục không tồn tại",
            });
        }
        const existUser = await User.findOne({ userId });
        if (!existUser) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại",
            });
        }

        const { error } = projectSchema.validate(formData, { abortEarly: false });
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }

        const project = await Project.create(formData);
        if (!project) {
            return res.status(400).json({
                success: false,
                message: "Thêm dự án thất bại!",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Thêm dự án thành công!",
            project
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Lỗi server",
        });
    }
}