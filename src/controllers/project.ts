import { Request, Response } from "express";
import Project from "../models/project";
import { projectSchema, projectUpdateSchema } from "../schemas/project";
import { IProject, IprojectResponse } from "../interfaces/project";

export const createProject = async (req: Request, res: Response) => {
    const formData = req.body;
    const { project_name } = req.body;
    try {

        const checkName = await Project.findOne({ project_name });
        if (checkName) {
            return res.status(400).json({
                message: "Tên dự án đã tồn tại",
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
                message: "Thêm dự án thất bại!",
            });
        }
        return res.status(200).json({
            message: "Thêm dự án thành công!",
            project
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Lỗi server",
        });
    }
}

export const updateProject = async (req: Request, res: Response) => {
    const formData = req.body;
    const { project_name } = req.body;
    const id = req.params.id;
    try {

        const CheckId = await Project.findById(id);
        if (!CheckId) {
            return res.status(400).json({
                message: "Không tìm thấy dữ liệu cần cập nhật!",
            });
        }

        const checkName = await Project.findOne({ project_name });
        if (checkName) {
            return res.status(400).json({
                message: "Tên dự án đã tồn tại",
            });
        }

        const { error } = projectUpdateSchema.validate(formData, { abortEarly: false });
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }

        const project = await Project.findByIdAndUpdate(id, formData, { new: true });
        if (!project) {
            return res.status(400).json({
                message: "Cập nhật dự án thất bại!",
            });
        }
        return res.status(200).json({
            message: "Cập nhật dự án success!",
            project
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Lỗi server",
        });
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const CheckId = await Project.findById(id);
        if (!CheckId) {
            return res.status(400).json({
                message: "Không tìm thấy dữ liệu cần xóa!",
            });
        }

        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(400).json({
                message: "Xóa dự án thất bại!",
            });
        }
        return res.status(200).json({
            message: "Xóa dự án thành công!",
            project
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Lỗi server",
        });
    }
}

export const getProjectById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const project = await Project.findById(id) as any;
        if (!project) {
            return res.status(400).json({
                message: "Không tìm thấy thông tin dự án!",
            });
        }
        project.project_view++;
        project.save();
        return res.status(200).json({
            message: "Lấy thông tin dự án thành công!",
            project
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Lỗi server",
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
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
        const projects = await Project.find({}, options) as any;
        if (!projects || projects.length === 0) {
            return res.status(400).json({
                message: "Không tìm thấy thông tin dự án!",
            });
        }

        const response: IprojectResponse = {
            data: projects.docs,
            pagination: {
                currentPage: projects.page,
                totalPages: projects.totalPages,
                totalItems: projects.totalDocs,
            },
        };

        return res.status(200).json({
            message: "Lấy danh sách dự án thành công!",
            response
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Lỗi server",
        });
    }
}