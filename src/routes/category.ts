import express from "express";
import { addCategory, getAllCategory, getCategoryById, remove, updateCategory } from "../controllers/category";



const routerCategory = express.Router();

routerCategory.get("/category", getAllCategory)
routerCategory.get("/category/:id", getCategoryById)
routerCategory.delete("/category/:id", remove)
routerCategory.post("/category", addCategory)
routerCategory.patch("/category/:id", updateCategory)



export default routerCategory;