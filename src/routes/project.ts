import express, { Router } from "express";
import { createProject, deleteProject, getAll, getProjectById, updateProject } from "../controllers/project";

const router: Router = express.Router();

router.get('/projects', getAll);
router.get("/projects/:id", getProjectById);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject)
router.delete("/projects/:id", deleteProject)

export default router;