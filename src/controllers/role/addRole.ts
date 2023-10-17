import { Request, Response } from "express";
import Role from "../../models/role";
import { roleSchema } from "../../schemas/role";
import { IRole } from "../../interfaces/role";

export const addRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { error } = roleSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(
        (error: { message: string }) => error.message
      );
      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const roleExists = await Role.findOne({ role: req.body.role });

    if (roleExists) {
      return res.status(400).json({
        message: `${req.body.role} đã tồn tại`,
      });
    }

    const role: IRole = await Role.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Tạo role thành công",
      role,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
