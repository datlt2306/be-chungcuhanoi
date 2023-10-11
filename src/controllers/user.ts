import { Request } from "express";
import User from "../models/user";
import { Response } from "express";
import { IUser } from "../interfaces/user";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông tin người dùng",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      user: { ...user },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.params.id;
    const userData: IUser = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Cập nhật tài khoản thành công",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cập nhật tài khoản không thành công",
      error: error.message,
    });
  }
};
