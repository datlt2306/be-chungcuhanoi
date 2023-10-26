import { Request } from "express";
import User from "../../models/user";
import { Response } from "express";
import { IUser } from "../../interfaces/user";

export const getAllUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      _page = 1,
      _limit = 10,
      _sort = "createAt",
      _order = "asc",
    } = req.query;

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort as string]: _order === "desc" ? -1 : 1,
      },
    };
    const user = await User.paginate({}, options);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Không tìm thấy thông tin người dùng",
      });
    }

    const result = user.docs.map((user: IUser) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    }));

    return res.status(200).json({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.params.id;
    const {
      _page = 1,
      _limit = 10,
      _sort = "createAt",
      _order = "asc",
    } = req.query;

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort as string]: _order === "desc" ? -1 : 1,
      },
    };
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Không tìm thấy thông tin người dùng",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};

export const getUserByToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Không tìm thấy thông tin người dùng",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      user
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};
