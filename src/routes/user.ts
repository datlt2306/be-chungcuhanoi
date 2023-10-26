import express from "express";
import { getAllUser, getUserByToken, getUserProfile } from "../controllers/user/user";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";
import updateProfile from "../controllers/user/update";

const userRouter = express.Router();

userRouter.get("/user", authenticate, authorization, getAllUser);
userRouter.get("/user/profile/:id", getUserProfile);
userRouter.get("/user/token/:token", getUserByToken);
userRouter.patch("/user/update/:id", authenticate, updateProfile);

export default userRouter;
