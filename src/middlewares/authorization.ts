import { NextFunction } from "express";
export const authorization = async (req: any, res: any, next: NextFunction) => {
  try {
    const user = req.user;
    if (!(user.role === "admin")) {
      return res.status(400).json({
        success: false,
        message: "Bạn không có quyền để thực hiện hành động này",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
