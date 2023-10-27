import express from "express";
import { getUserProfile } from "../controllers/user/user";
import { authenticate } from "../middlewares/authenticate";
import updateProfile from "../controllers/user/update";

const userRouter = express.Router();

userRouter.get("/user/profile", authenticate, getUserProfile);
userRouter.patch("/user/update", authenticate, updateProfile);

export default userRouter;
