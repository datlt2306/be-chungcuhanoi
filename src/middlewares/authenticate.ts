import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import User from "../models/user";

export const authenticate = async (req: any, res: any, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new Error("Bạn phải đăng nhập để thực hiện hành động này");

    const token = authHeader && (authHeader.split(" ")[1] as string);
    const secretKey: string = process.env.JWT_SECRET!;

    jwt.verify(
      token,
      secretKey,
      async (error: { name: string }, payload: any) => {
        if (error) {
          if (error.name === "JsonWebTokenError") {
            return res.status(400).json({
              success: false,
              message: "Token không hợp lệ",
            });
          }
          if (error.name === "TokenExpiredError") {
            return res.status(400).json({
              success: false,
              message: "Token đã hết hạn",
            });
          }
        }
        const user = (await User.findById(payload?.["user"]?._id)) as IUser;
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Không tìm thấy người dùng",
          });
        }

        req.user = user;
        next();
      }
    ) as JwtPayload;
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
