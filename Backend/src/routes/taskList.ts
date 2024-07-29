import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createTaskList, editTasklist, getAllTasklist } from "../controllers/taskList.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createTaskList);

router.route("/all").post(isAuthenticated, getAllTasklist);

router.route("/edit").put(isAuthenticated, editTasklist);


export default router;
