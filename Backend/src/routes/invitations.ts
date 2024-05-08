import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { inviteUsers } from "../controllers/invitations.js";

const router = express.Router();

router.route("/inviteUsers").post(isAuthenticated, inviteUsers)

export default router;
