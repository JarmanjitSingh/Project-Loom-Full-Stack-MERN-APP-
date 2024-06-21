import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createTaskList, getAllTasklist } from "../controllers/taskList.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createTaskList);

router.route("/all").post(isAuthenticated, getAllTasklist)

export default router;
