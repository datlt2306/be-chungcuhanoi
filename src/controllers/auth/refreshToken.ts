import jwt, { Secret } from "jsonwebtoken";
import { refreshTokenSchema } from "../../schemas/refreshToken.js";
import RefreshToken from "../../models/refreshToken.js";
import Joi from "joi";
import { Request, Response } from "express";
import { IRefreshToken } from "../../interfaces/refreshToken .js";
import { IUser } from "../../interfaces/user.js";
import User from "../../models/user.js";

export const refreshToken = async (req: Request, res: Response) => {
  const { error } = refreshTokenSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      messange: error.details.map(
        (err: Joi.ValidationErrorItem) => err.message
      ),
    });
  }

  const secretKey: string = process.env.JWT_SECRET!;

  const token = await RefreshToken.findOne<IRefreshToken>(req.body);

  const userExists = await User.findById(req.body.userId);
  if (!userExists) {
    return res.status(404).json({
      error: true,
      message: "Người dùng không tồn tại",
    });
  }

  jwt.verify(
    token?.refreshToken,
    secretKey,
    async (error: any, user: IUser) => {
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

      const token = jwt.sign(
        { user: user?.["user"] },
        process.env.JWT_SECRET as Secret,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        token,
      });
    }
  );
};
