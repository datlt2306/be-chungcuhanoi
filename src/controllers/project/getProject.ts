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
        _search = "",
        _project_wards = "",
        _project_district = "",
        _categoryId = "",
        _project_acreage,
        _status,
        minPrice, // Thêm minPrice và maxPrice vào req.query
        maxPrice,
    } = req.query;

    const options = {
        page: _page,
        sort: { [_sort as string]: _order === "asc" ? -1 : 1 },
        limit: _limit,
    };

    try {
        const searchQuery: any = {};
        if (_categoryId) {
            searchQuery.categoryId = _categoryId;
        }
        if (_search || _project_acreage || _status || _project_wards || minPrice || maxPrice || _project_district) {

            searchQuery.$and = [];
            if (_search) {
                searchQuery.$and = [];
                searchQuery.$and.push({
                    project_name: { $regex: _search, $options: "i" },
                });
            }
            if (_project_acreage) {
                const maxProjectAcreage = Number(_project_acreage);
                searchQuery.$and.push({
                    project_acreage: { $lt: maxProjectAcreage },
                });
            }

            if (_status) {
                const maxProjectstatus = Number(_status);
                searchQuery.$and.push({
                    status: { $eq: maxProjectstatus },
                });
            }
            if (_project_wards) {
                searchQuery.$and.push({
                    project_wards: { $regex: _project_wards, $options: "i" },
                });
            }
            if (_project_district) {
                searchQuery.$and.push({
                    project_district: { $regex: _project_district, $options: "i" },
                });
            }
            if (minPrice && !maxPrice) {
                const minPriceValue = Number(minPrice);
                searchQuery.$and = searchQuery.$and || [];
                searchQuery.$and.push({
                    project_price: { $gte: minPriceValue },
                });
            } else if (!minPrice && maxPrice) {
                const maxPriceValue = Number(maxPrice);
                searchQuery.$and = searchQuery.$and || [];
                searchQuery.$and.push({
                    project_price: { $lte: maxPriceValue },
                });
            } else if (minPrice && maxPrice) {
                const minPriceValue = Number(minPrice);
                const maxPriceValue = Number(maxPrice);
                searchQuery.$and = searchQuery.$and || [];
                searchQuery.$and.push({
                    project_price: {
                        $gte: minPriceValue,
                        $lte: maxPriceValue,
                    },
                });
            }
        }

        const projects = await Project.paginate(searchQuery, options) as any;
        if (!projects || projects.docs.length === 0) {
            return res.status(400).json({
                message: "Không tìm thấy thông tin dự án!",
            });
        }

        await Project.populate(projects.docs, [
            {
                path: "categoryId",
                // select: "color_id size_id variant_discount variant_price",
            },
            {
                path: "userId",
                // select: "color_id size_id variant_discount variant_price",
            },
        ]);

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
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
