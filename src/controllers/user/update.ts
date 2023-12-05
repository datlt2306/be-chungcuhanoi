import { Request, Response } from "express";
import User from "../../models/user";
import { IUser } from "../../interfaces/user";
import RefreshToken from "../../models/refreshToken.js";
import bcrypt from "bcryptjs";
import { userSchema } from "../../schemas/user";
import jwt, { Secret } from "jsonwebtoken";

const updateProfile = async (req: Request, res: Response) => {
  try {
    const idUser = req?.["user"]?._id;
    const { email, phone, password } = req.body;
    const { error } = userSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        error: true,
        messages: error.details.map((detail) => detail.message),
      });
    }
    const user: IUser | null = await User.findById(idUser);
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "Tài khoản không tồn tại" });
    }

    const emailExists: IUser | null = await User.findOne({
      email: { $ne: user.email },
    });
    if (emailExists?.email === email) {
      return res.status(400).json({
        error: true,
        message: "Email đã tồn tại",
      });
    }

    const phoneExists: IUser | null = await User.findOne({
      phone: { $ne: user.phone },
    });
    if (phoneExists?.phone === phone) {
      return res.status(400).json({
        error: true,
        message: "số điện thoại đã tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: true, message: "Mật khẩu không khớp" });
    }

    const productUpdate = await User.findByIdAndUpdate(
      idUser,
      {
        ...req.body,
        password: user.password,
      },
      { new: true }
    );

    if (!productUpdate) {
      return res.status(200).json({
        error: true,
        message: "Cập nhật tài khoản thất bại!",
      });
    }

    const token = jwt.sign(
      { productUpdate },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "7d",
      }
    );
    const refreshToken = jwt.sign(
      { productUpdate },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "30d",
      }
    );

    await RefreshToken.updateMany({ userId: productUpdate._id }, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Cập nhật tài khoản thành công",
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export default updateProfile;
