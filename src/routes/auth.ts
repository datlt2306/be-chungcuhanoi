import express, { Router } from "express";
import { signup, signin } from "../controllers/auth/auth";
import { refreshToken } from "../controllers/auth/refreshToken";

const authRouter: Router = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/refreshToken", refreshToken);

export default authRouter;
