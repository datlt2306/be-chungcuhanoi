import express, { Router } from "express";
import { createProject, deleteForce, deleteProject, getAll, getAllDeleted, getProjectById, updateProject } from "../controllers/project/index";

const router: Router = express.Router();

router.get('/projects', getAll);
router.get('/project/getAllDeleted', getAllDeleted);
router.get("/projects/:id", getProjectById);

router.post("/projects", createProject);
router.put("/projects/:id", updateProject);

router.delete("/projects/:id", deleteProject);
router.delete("/projects/force/:id", deleteForce);

export default router;