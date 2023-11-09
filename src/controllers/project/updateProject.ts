import { Request, Response } from "express";
import Project from "../../models/project";
import { projectUpdateSchema } from "../../schemas/project";

export const updateProject = async (req: Request, res: Response) => {
    const formData = req.body;
    const { createdAt, updatedAt, ...rest } = req.body;
    const id = req.params.id;
    try {

        const CheckId = await Project.findById(id);
        if (!CheckId) {
            return res.status(400).json({
                message: "Không tìm thấy dữ liệu cần cập nhật!",
            });
        }

        const checkName = await Project.findOne({ ...rest });
        console.log(checkName);

        if (checkName) {
            return res.status(200).json({
                message: "Cập nhật thành công không có gì thay đổi",
            });
        }

        // const { error } = projectUpdateSchema.validate(formData, { abortEarly: false });
        // if (error) {
        //     const errors = error.details.map((message) => ({ message }));
        //     return res.status(400).json({ errors });
        // }

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
