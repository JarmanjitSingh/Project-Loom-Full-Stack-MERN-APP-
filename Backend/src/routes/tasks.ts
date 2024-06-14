import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createTask } from "../controllers/tasks.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createTask);

export default router;
