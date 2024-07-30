import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createTask, deleteTask, editTask } from "../controllers/tasks.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createTask);

router.route("/edit").put(isAuthenticated, editTask);

router.route("/delete").delete(isAuthenticated, deleteTask);


export default router;
