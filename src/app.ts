import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import connectDB from "./config/database";
import cors from "cors";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

import routerCategory from "./routes/category";
// import swaggerDocs from "./utils/swagger";
import ProjectRouter from "./routes/project";

const app: Express = express();

dotenv.config();
app.use(cors());

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", routerCategory);
app.use("/api", ProjectRouter);

// swaggerDocs(app, 3000);
// Khởi tạo kết nối với cơ sở dữ liệu
connectDB(process.env.MONGO_URI as string);
export const viteNodeApp: Express = app;
