import express from "express";
import { getAllUser, getUserProfile } from "../controllers/user/user";

const userRouter = express.Router();

userRouter.get("/user", getAllUser);
userRouter.get("/user/profile/:id", getUserProfile);

export default userRouter;
