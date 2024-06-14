import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createTaskList } from "../controllers/taskList.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createTaskList);

export default router;
