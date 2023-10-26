import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import User from "../../models/user";
import RefreshToken from "../../models/refreshToken.js";
import { signInSchema, signupSchema } from "../../schemas/auth";
import { IUser } from "../../interfaces/user";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, phone, password } = await req.body;

    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        error: true,
        message: errors,
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        error: true,
        message: "Email đã tồn tại",
        success: false,
      });
    }

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({
        error: true,
        message: "số điện thoại đã tồn tại",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: IUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    const token = jwt.sign({ user }, process.env.JWT_SECRET as Secret, {
      expiresIn: "7d",
    });

    const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET as Secret, {
      expiresIn: "30d",
    });

    await RefreshToken.create({ userId: user._id, refreshToken });

    return res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { error } = signInSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json({
        error: true,
        message: errors,
      });
    }
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "Tài khoản không tồn tại" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ error: true, message: "Mật khẩu không khớp" });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET as Secret, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET as Secret, {
      expiresIn: "30d",
    });

    await RefreshToken.updateMany({ userId: user._id }, refreshToken);

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
