import express from "express";
import {
  addRole,
  deleteRole,
  getAllRole,
  getOneRole,
  updateRole,
} from "../controllers/role";

const roleRouter = express.Router();

roleRouter.get("/role", getAllRole);
roleRouter.get("/role/:id", getOneRole);
roleRouter.post("/role", addRole);
roleRouter.patch("/role/update/:id", updateRole);
roleRouter.delete("/role/:id", deleteRole);

export default roleRouter;
