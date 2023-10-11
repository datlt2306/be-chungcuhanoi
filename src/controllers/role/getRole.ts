import { Request } from "express";
import { Response } from "express";
import Role from "../../models/role";

export const getAllRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const role = await Role.find();
    if (role.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không có Role!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Lấy danh sách Role thành công",
      role,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};

export const getOneRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy Role",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Lấy Role thành công",
      role,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};
