import { Request, Response } from "express";
import Project from "../../models/project";

export const deleteProject = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const CheckId = await Project.findById(id);
        if (!CheckId) {
            return res.status(400).json({
                message: "Không tìm thấy dữ liệu cần xóa!",
            });
        }

        const project = await Project.findById(id) as any;
        if (project !== null) {
            // await project.softdelete();
            await project.delete();
        }
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


export const deleteForce = async (req: Request, res: Response) => {
    try {
        const project = await Project.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            message: "Xoá dự án vĩnh viễn",
            project,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

// export const restoreProject = async (req: Request, res: Response) => {
//     const { id } = req.params
//     try {
//         const restoredProject = await Project.restore(
//             { _id: id },
//             { new: true }
//         );
//         console.log(restoredProject);

//         if (!restoredProject) {
//             return res.status(400).json({
//                 message: "Dự án không tồn tại hoặc đã được khôi phục trước đó.",
//             });
//         }

//         return res.status(200).json({
//             message: "Khôi phục dữ liệu thành công.",
//             project: restoredProject,
//         });
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message || "Lỗi server",
//         });
//     }
// };
