import { Request, Response } from "express";
import Role from "../../models/role";
import { roleSchema } from "../../schemas/role";

export const updateRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { error } = roleSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role không tồn tại",
      });
    }

    return res.status(200).json({
      success: true,
      message: "cập nhật Role thành công",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
