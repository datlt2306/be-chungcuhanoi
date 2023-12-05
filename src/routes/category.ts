import express from "express";
import {
  getAllCategory,
  getCategoryById,
  remove,
  addCategory,
  updateCategory,
} from "../controllers/category/Index";

const routerCategory = express.Router();

routerCategory.get("/category", getAllCategory);
routerCategory.get("/category/:id", getCategoryById);
routerCategory.delete("/category/:id", remove);
routerCategory.post("/category", addCategory);
routerCategory.patch("/category/:id", updateCategory);

export default routerCategory;
