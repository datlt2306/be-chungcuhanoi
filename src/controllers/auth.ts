import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/user";
import Role from "../models/role";
import { signInSchema, signupSchema } from "../schemas/auth";
import { IUser } from "../interfaces/user";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, phone, password, roleId } = await req.body;

    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const phneExists = await User.findOne({ phone });
    if (phneExists) {
      return res.status(400).json({
        message: "số điện thoại đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: IUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      roleId,
    });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as Secret);

    await Role.findByIdAndUpdate(roleId, {
      $addToSet: {
        users: user._id,
      },
    });

    return res.status(201).json({
      message: "Đăng ký thành công",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        roleId: user.roleId,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { error } = signInSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        success: false,
        message: errors,
      });
    }
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản không tồn tại" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu không khớp" });
    }

    const token = jwt.sign({ _id: user._id }, "batdongsan");

    res.status(200).json({
      success: true,
      user,
      accessToken: token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
