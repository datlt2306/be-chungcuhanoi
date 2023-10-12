import { Request, Response } from "express";
import Rolo from "../../models/role";
import User from "../../models/user";

export const deleteRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const roleId = req.params.id;
    const role = await Rolo.findByIdAndDelete(roleId);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role không tồn tại!",
      });
    }

    await User.updateMany({ roleId: role._id }, { roleId: null });

    return res.status(200).json({
      success: true,
      message: "Xóa Role thành công",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
