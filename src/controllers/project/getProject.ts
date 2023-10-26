import { Request, Response } from "express";
import Project from "../../models/project";
import { IprojectResponse } from "../../interfaces/project";


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
        _search = ""
    } = req.query;

    const options = {
        page: _page,
        sort: { [_sort as string]: _order === "asc" ? -1 : 1 },
        limit: _limit,
    };

    try {
        const searchQuery = _search ? { project_name: { $regex: _search, $options: "i" } } : {};
        const projects = await Project.paginate(searchQuery, options) as any;
        if (!projects || projects.docs.length === 0) {
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

export const getAllDeleted = async (req: Request, res: Response) => {
    try {
        const deletedProject = await Project.findDeleted({});
        if (!deletedProject || deletedProject.length === 0) {
            return res.status(400).json({
                message: "Không tìm thấy thông tin !",
            });
        }
        return res.status(200).json({
            message: "Lấy tất cả dữ liệu đã bị xóa",
            project: deletedProject,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
