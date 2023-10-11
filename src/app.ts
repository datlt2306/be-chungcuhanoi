import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import connectDB from "./config/database";
import cors from 'cors';
import routerCategory from "./routes/category";
// import swaggerDocs from "./utils/swagger";

const app: Express = express();

dotenv.config();

// Khởi tạo kết nối với cơ sở dữ liệu
connectDB(process.env.MONGO_URI as string);

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors())
// api
app.use("/api", routerCategory);
// swaggerDocs(app, 3000);

export const viteNodeApp: Express = app;
