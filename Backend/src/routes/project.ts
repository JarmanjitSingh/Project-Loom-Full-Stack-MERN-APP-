import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createProject } from "../controllers/project.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createProject)

export default router;