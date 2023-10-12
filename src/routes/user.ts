import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/user/profile/:id", getUserProfile);
userRouter.patch("/user/update/:id", updateUserProfile);

export default userRouter;
